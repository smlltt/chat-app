import React, { FC, useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ApiFirebase } from "api";
import { Box } from "@mui/material";
import { UserType } from "../../../api/types";

interface LastMessageInterface {
  conversationId: string;
  loggedInUser: string;
  recipient?: UserType;
}

const LastMessage: FC<LastMessageInterface> = ({
  conversationId,
  loggedInUser,
  recipient,
}) => {
  const [lastMessage] = useDocumentData(
    ApiFirebase.lastMessageRef(conversationId)
  );
  const content = lastMessage?.file ? "Picture" : lastMessage?.text || "";
  const messageSentFromLoggedInUser = loggedInUser === lastMessage?.from;

  const setLastMessageToRead = async () => {
    await ApiFirebase.updateDocument("lastMessage", conversationId, {
      unread: false,
    });
  };

  useEffect(() => {
    //I check that 1. the last message was not sent by me (if yes, no point in marking it as read), 2. there is a lastMessage,
    // 3. some conversation was selected (recipient not undefined): I do not want to mark anything as read before I select a specific conversation
    if (!messageSentFromLoggedInUser && lastMessage && recipient) {
      //If the last message was sent by the person I am in a conversation with (not by me), I mark it as read
      if (lastMessage.from === recipient.uid) {
        setLastMessageToRead();
      }
    }
  }, [recipient, messageSentFromLoggedInUser, content, lastMessage]);

  return (
    <Box
      fontWeight={
        lastMessage?.unread && !messageSentFromLoggedInUser ? 800 : 500
      }
      maxWidth={{ sm: 100, md: 180, lg: 300 }}
      whiteSpace={"nowrap"}
      textOverflow={"ellipsis"}
      maxHeight={20}
      overflow={"hidden"}
    >
      {messageSentFromLoggedInUser ? `Me: ${content}` : content}
    </Box>
  );
};

export default LastMessage;
