import React, { FC } from "react";
import { DocumentData } from "firebase/firestore";
import ConversationComponent from "./Conversation.component";

interface ConversationProps {
  chat: DocumentData | undefined;
}

const Conversation: FC<ConversationProps> = ({ chat }) => {
  return <ConversationComponent chat={chat} />;
};

export default Conversation;
