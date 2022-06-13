import React, { FC } from "react";
import MessageFormComponent from "./MessageForm.component";
import { MessageFormValuesProps } from "./types";
import { ApiFirebase } from "../../../api";
import { Timestamp } from "firebase/firestore";

interface MessageFormProps {
  senderId?: string;
  recipientId?: string;
}

const MessageForm: FC<MessageFormProps> = ({ senderId, recipientId }) => {
  const uploadFile = async (file: File) => {
    const imgRef = ApiFirebase.createRef(
      `files/${new Date().getTime()} - ${file.name}`
    );
    const snap = await ApiFirebase.uploadFile(imgRef, file);
    return ApiFirebase.getDownloadURL(snap.ref.fullPath);
  };

  const handleSubmit = async (values: MessageFormValuesProps) => {
    const fileUrl = values.file && (await uploadFile(values.file));
    if (!senderId || !recipientId) return;
    const conversationId =
      senderId > recipientId
        ? `${senderId + recipientId}`
        : `${recipientId + senderId}`;
    await ApiFirebase.addMessage(conversationId, {
      createdAt: Timestamp.fromDate(new Date()),
      from: senderId,
      to: recipientId,
      text: values.text,
      file: fileUrl || "",
    });
  };

  return <MessageFormComponent handleSubmit={handleSubmit} />;
};

export default MessageForm;
