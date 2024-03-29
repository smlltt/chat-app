import React, { ChangeEvent, useState } from "react";
import ProfileComponent from "./Profile.component";
import { ApiFirebase } from "api";
import { useAuth, useStopLoadingAndShowToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { BasicDialog } from "components/molecules";

const Profile = () => {
  const { user } = useAuth();
  const uid = user?.uid;
  const [value] = useDocumentData(ApiFirebase.userRef(uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const currentAvatarPath = value?.avatarPath;
  const [loading, setLoading] = useState(false);
  const stopLoadingAndShowToast = useStopLoadingAndShowToast(setLoading);
  const [showDeleteImgModal, setShowDeleteImgModal] = useState(false);

  const uploadImage = async (image: File) => {
    setLoading(true);
    const imgRef = ApiFirebase.createRef(
      `avatar/${new Date().getTime()} - ${image.name}`
    );
    try {
      currentAvatarPath && (await ApiFirebase.deleteFile(currentAvatarPath));
      const snap = await ApiFirebase.uploadFile(imgRef, image);
      updateUserImage(snap.ref.fullPath);
    } catch (err: any) {
      stopLoadingAndShowToast(ToastTypeEnum.ERROR, err.message);
    }
  };

  const updateUserImage = async (path?: string) => {
    const url = path ? await ApiFirebase.getDownloadURL(path) : "";
    if (uid) {
      try {
        await ApiFirebase.updateDocument("users", uid, {
          avatar: url,
          avatarPath: path,
        });
        stopLoadingAndShowToast(ToastTypeEnum.SUCCESS);
      } catch (err: any) {
        stopLoadingAndShowToast(ToastTypeEnum.ERROR, err.message);
      }
    }
  };

  const deleteImage = async () => {
    setLoading(true);
    if (currentAvatarPath) {
      try {
        await ApiFirebase.deleteFile(currentAvatarPath);
        await updateUserImage("");
      } catch (err: any) {
        stopLoadingAndShowToast(ToastTypeEnum.ERROR, err.message);
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
    <>
      <ProfileComponent
        handleImageSelect={handleImageSelect}
        user={value}
        loading={loading}
        handleDeleteClick={(): void => setShowDeleteImgModal(true)}
      />
      <BasicDialog
        title={"Are you sure?"}
        content={"Are you sure you want to delete your avatar?"}
        open={showDeleteImgModal}
        handleClose={(): void => setShowDeleteImgModal(false)}
        handleConfirm={() => {
          setShowDeleteImgModal(false);
          deleteImage();
        }}
      />
    </>
  );
};

export default Profile;
