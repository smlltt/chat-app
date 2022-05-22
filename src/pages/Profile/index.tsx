import React, { ChangeEvent, useState } from "react";
import ProfileComponent from "./Profile.component";
import { ApiFirebase } from "api";
import { app, auth } from "config/firebase";
import { useToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { useDocument } from "react-firebase-hooks/firestore";
import { getFirestore, doc } from "firebase/firestore";

const Profile = () => {
  const uid = auth.currentUser?.uid;
  const [value] = useDocument(doc(getFirestore(app), "users", uid || ""), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const { handleToast } = useToast();
  const [loading, setLoading] = useState(false);

  const uploadImage = async (image: File) => {
    setLoading(true);
    const imgRef = ApiFirebase.createRef(
      `avatar/${new Date().getTime()} - ${image.name}`
    );
    try {
      const snap = await ApiFirebase.uploadFile(imgRef, image);
      updateUserImage(snap.ref.fullPath);
    } catch (err: any) {
      setLoading(false);
      handleToast(ToastTypeEnum.ERROR, err.message);
    }
  };

  const updateUserImage = async (path: string) => {
    const url = await ApiFirebase.getDownloadURL(path);
    if (uid) {
      try {
        await ApiFirebase.updateDocument("users", uid, {
          avatar: url,
          avatarPath: path,
        });
        setLoading(false);
        handleToast(ToastTypeEnum.SUCCESS);
      } catch (err: any) {
        setLoading(false);
        handleToast(ToastTypeEnum.ERROR, err.message);
      }
    }
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    uploadImage(e.target.files[0]);
  };

  return (
    <ProfileComponent
      handleImageSelect={handleImageSelect}
      user={value?.data()}
      loading={loading}
    />
  );
};

export default Profile;
