import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ChatsWrapper } from "components/layouts";
import { LoadingAndError, MessageForm } from "components/organisms";
import ConversationHeader from "./ConversationHeader";
import { ShowUsers } from "pages/Home/types";
import { ChatType, UserType } from "api/types";
import { FirestoreError } from "firebase/firestore";
import { Message } from "components/molecules";
import { Virtuoso } from "react-virtuoso";

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
  const conversationLength = conversation?.length || 0;
  const [chat, setChat] = useState(conversation?.slice(-20));
  const [firstItemIndex, setFirstItemIndex] = useState(
    conversationLength - 20 > 0
      ? conversationLength - 20
      : conversationLength - 1
  );
  const ref = useRef<any>(null);

  const scrollToEnd = () => {
    if (ref.current && conversationLength - 1 >= 0) {
      ref.current.scrollToIndex({
        index: conversationLength - 1,
        behaviour: "smooth",
      });
    }
  };

  useEffect(() => {
    if (conversation) {
      setChat(conversation.slice(-20));
      setFirstItemIndex(
        conversationLength - 20 > 0
          ? conversationLength - 20
          : conversationLength - 1
      );
      const timer = setTimeout(() => {
        scrollToEnd();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [conversation, ref]);

  const prependItems = useCallback(() => {
    chat && setChat(conversation?.slice(-chat.length - 20));
    const messagesToPrepend = 20;
    const nextFirstItemIndex =
      firstItemIndex - messagesToPrepend > 0
        ? firstItemIndex - messagesToPrepend
        : 0;
    setFirstItemIndex(nextFirstItemIndex);
    return false;
  }, [conversation, chat, firstItemIndex, setChat]);

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
          {chat && (
            <Virtuoso
              followOutput={"smooth"}
              overscan={20}
              ref={ref}
              style={{ height: "78%" }}
              firstItemIndex={firstItemIndex}
              initialTopMostItemIndex={conversationLength - 1}
              data={chat}
              startReached={prependItems}
              itemContent={(index, message) => {
                return <Message message={message} />;
              }}
            />
          )}
          <MessageForm
            recipientId={recipient.uid}
            senderId={senderId}
            showUsers={showUsers}
          />
        </>
      ) : (
        <ConversationHeader content={"Select a user to start a conversation"} />
      )}
    </ChatsWrapper>
  );
};

export default ConversationComponent;
