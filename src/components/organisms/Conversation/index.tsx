import React, { FC } from "react";
import { DocumentData } from "firebase/firestore";
import ConversationComponent from "./Conversation.component";
import { ShowUsers } from "pages/Home/types";

interface ConversationProps {
  chat: DocumentData | undefined;
  showUsers: ShowUsers;
}

const Conversation: FC<ConversationProps> = ({ chat, showUsers }) => {
  return <ConversationComponent chat={chat} showUsers={showUsers} />;
};

export default Conversation;
