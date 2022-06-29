import React, { FC } from "react";
import { ChatType } from "api/types";
import { Box, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ApiFirebase } from "api";
import { auth } from "config/firebase";

interface MessageProps {
  message: ChatType;
}

const Message: FC<MessageProps> = ({ message }) => {
  const [user] = useDocumentData(ApiFirebase.userRef(message.from), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const loggedUserId = auth.currentUser?.uid;
  const isMessageFromLoggedInUser = user?.uid === loggedUserId;

  return (
    <MainWrapper>
      <MessageWrapper isMessageFromLoggedInUser={isMessageFromLoggedInUser}>
        {message.text && message.text}
      </MessageWrapper>
      {message.file && (
        <Card>
          <CardMedia
            component="img"
            alt="picture"
            image={message.file}
            onClick={() => window.open(message.file)}
            sx={{ maxHeight: 500 }}
          />
        </Card>
      )}
    </MainWrapper>
  );
};

export default Message;

const MainWrapper = styled(Box)({
  paddingTop: 6,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  paddingRight: 12,
  paddingLeft: 12,
});

const MessageWrapper = styled(Box)(
  ({ isMessageFromLoggedInUser }: { isMessageFromLoggedInUser: boolean }) => ({
    backgroundColor: isMessageFromLoggedInUser ? "pink" : "blue",
    width: "max-content",
    maxWidth: "90%",
    alignSelf: isMessageFromLoggedInUser ? "flex-end" : "flex-start",
  })
);
