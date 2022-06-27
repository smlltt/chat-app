import React, { FC } from "react";
import ConversationComponent from "./Conversation.component";
import { ShowUsers } from "pages/Home/types";
import { UserType } from "api/types";
import { ApiFirebase } from "api";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface ConversationProps {
  recipient: UserType | undefined;
  showUsers: ShowUsers;
  senderId?: string;
  conversationId: string;
}

const Conversation: FC<ConversationProps> = ({
  recipient,
  showUsers,
  senderId,
  conversationId,
}) => {
  const conversationQuery = conversationId
    ? ApiFirebase.chatsRef(conversationId)
    : undefined;
  const [conversation, loading, error] = useCollectionData(conversationQuery);

  return (
    <ConversationComponent
      recipient={recipient}
      showUsers={showUsers}
      senderId={senderId}
      loading={loading}
      error={error}
    />
  );
};

export default Conversation;
