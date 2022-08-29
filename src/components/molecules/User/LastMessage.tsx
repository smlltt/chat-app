import React, { FC } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ApiFirebase } from "api";
import { Box } from "@mui/material";

interface LastMessageInterface {
  conversationId: string;
}

const LastMessage: FC<LastMessageInterface> = ({ conversationId }) => {
  const [lastMessage] = useDocumentData(
    ApiFirebase.lastMessageRef(conversationId)
  );
  const content = lastMessage?.file ? "Picture" : lastMessage?.text || "";
  return (
    <Box
      fontWeight={lastMessage?.unread ? 800 : 500}
      maxWidth={{ sm: 120, md: 180, lg: 300 }}
      whiteSpace={"nowrap"}
      textOverflow={"ellipsis"}
      maxHeight={20}
      overflow={"hidden"}
    >
      {content}
    </Box>
  );
};

export default LastMessage;
