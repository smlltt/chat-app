import React, { FC } from "react";
import ConversationComponent from "./Conversation.component";
import { ShowUsers } from "pages/Home/types";
import { UserType } from "api/types";

interface ConversationProps {
  recipient: UserType | undefined;
  showUsers: ShowUsers;
  senderId?: string;
}

const Conversation: FC<ConversationProps> = ({
  recipient,
  showUsers,
  senderId,
}) => {
  return (
    <ConversationComponent
      recipient={recipient}
      showUsers={showUsers}
      senderId={senderId}
    />
  );
};

export default Conversation;
