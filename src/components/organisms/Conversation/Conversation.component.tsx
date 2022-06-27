import React, { FC } from "react";
import { ChatsWrapper } from "components/layouts";
import { LoadingAndError, MessageForm } from "components/organisms";
import ConversationHeader from "./ConversationHeader";
import { ShowUsers } from "pages/Home/types";
import { UserType } from "api/types";
import { FirestoreError } from "firebase/firestore";

interface ConversationComponentProps {
  recipient: UserType | undefined;
  showUsers: ShowUsers;
  senderId?: string;
  error?: FirestoreError;
  loading?: boolean;
}

const ConversationComponent: FC<ConversationComponentProps> = ({
  recipient,
  showUsers,
  senderId,
  error,
  loading,
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
          {/*TODO compoenent to be added*/}
          <div style={{ display: "flex", flexGrow: 1 }}>messages</div>
          <MessageForm recipientId={recipient.uid} senderId={senderId} />
        </>
      ) : (
        <ConversationHeader content={"Select a user to start a conversation"} />
      )}
    </ChatsWrapper>
  );
};

export default ConversationComponent;
