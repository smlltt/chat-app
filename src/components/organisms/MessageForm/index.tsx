import React, { FC } from "react";
import MessageFormComponent from "./MessageForm.component";
import { MessageFormValuesProps } from "./types";
import { ApiFirebase } from "api";
import { Timestamp } from "firebase/firestore";
import { getConversationId } from "utils";
import { ShowUsers } from "pages/Home/types";

interface MessageFormProps {
  senderId?: string;
  recipientId?: string;
  showUsers: ShowUsers;
}

const MessageForm: FC<MessageFormProps> = ({
  senderId,
  recipientId,
  showUsers,
}) => {
  const uploadFile = async (file: File) => {
    const imgRef = ApiFirebase.createRef(
      `files/${new Date().getTime()} - ${file.name}`
    );
    const snap = await ApiFirebase.uploadFile(imgRef, file);
    return ApiFirebase.getDownloadURL(snap.ref.fullPath);
  };

  const handleSubmit = async (values: MessageFormValuesProps) => {
    const fileUrl = values.file && (await uploadFile(values.file));
    const messageData = {
      createdAt: Timestamp.fromDate(new Date()),
      from: senderId,
      to: recipientId,
      text: values.text,
      file: fileUrl || "",
    };
    if (!senderId || !recipientId) return;
    const conversationId = getConversationId(senderId, recipientId);
    await ApiFirebase.addMessage(conversationId, messageData);
    await ApiFirebase.createDocument("lastMessage", conversationId, {
      undread: true,
      ...messageData,
    });
  };

  return (
    <MessageFormComponent handleSubmit={handleSubmit} showUsers={showUsers} />
  );
};

export default MessageForm;
