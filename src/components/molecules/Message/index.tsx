import React, { FC } from "react";
import { ChatType } from "api/types";
import { Box, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ApiFirebase } from "api";

interface MessageProps {
  message: ChatType;
  showUserName: boolean;
  index: number;
}

const Message: FC<MessageProps> = ({ message, showUserName, index }) => {
  const [user] = useDocumentData(ApiFirebase.userRef(message.from), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <MessageWrapper showUserName={!!index && showUserName}>
      {user && showUserName && (
        <Box sx={{ fontWeight: "medium" }}>{user.name}</Box>
      )}
      <Box>{message.text && message.text}</Box>
      {message.file && (
        <Card>
          <CardMedia
            component="img"
            alt="picture"
            image={message.file}
            onClick={() => window.open(message.file)}
            sx={{ marginTop: 2, maxHeight: 500 }}
          />
        </Card>
      )}
    </MessageWrapper>
  );
};

export default Message;

const MessageWrapper = styled(Box)(
  ({ showUserName }: { showUserName: boolean }) => ({
    marginTop: showUserName ? 30 : 6,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  })
);
