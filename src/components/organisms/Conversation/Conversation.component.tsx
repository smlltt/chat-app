import React, { FC } from "react";
import { ChatsWrapper } from "components/layouts";
import { LoadingAndError, MessageForm } from "components/organisms";
import ConversationHeader from "./ConversationHeader";
import { ShowUsers } from "pages/Home/types";
import { ChatType, UserType } from "api/types";
import { FirestoreError } from "firebase/firestore";
import { Message } from "components/molecules";

interface ConversationComponentProps {
  recipient: UserType | undefined;
  showUsers: ShowUsers;
  senderId?: string;
  error?: FirestoreError;
  loading?: boolean;
  conversation?: ChatType[];
}

const ConversationComponent: FC<ConversationComponentProps> = ({
  recipient,
  showUsers,
  senderId,
  error,
  loading,
  conversation,
}) => {
  return (
    <ChatsWrapper
      xs={showUsers.conversationWrapperSpace}
      sm={8}
      sx={{ borderLeft: "1px solid lightGrey" }}
    >
      {recipient ? (
        <>
          <ConversationHeader content={recipient.name} />
          {(loading || error) && (
            <LoadingAndError loading={loading} error={error} />
          )}
          {conversation &&
            conversation.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          <MessageForm recipientId={recipient.uid} senderId={senderId} />
        </>
      ) : (
        <ConversationHeader content={"Select a user to start a conversation"} />
      )}
    </ChatsWrapper>
  );
};

export default ConversationComponent;
