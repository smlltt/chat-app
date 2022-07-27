import React, { FC, useState } from "react";
import { ChatType } from "api/types";
import { Box, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ApiFirebase } from "api";
import theme from "theme";
import { format, isToday } from "date-fns";
import { useAuth } from "hooks";

interface MessageProps {
  message: ChatType;
}

const Message: FC<MessageProps> = ({ message }) => {
  const userAuth = useAuth();

  const [user] = useDocumentData(ApiFirebase.userRef(message.from), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const loggedUserId = userAuth.user?.uid;
  const isMessageFromLoggedInUser = user?.uid === loggedUserId;
  const date = message.createdAt.toDate();
  const [toggleDate, setToggleDate] = useState(false);

  return (
    <MainWrapper>
      {message.text && (
        <MessageWrapper
          isMessageFromLoggedInUser={isMessageFromLoggedInUser}
          onClick={() => setToggleDate(!toggleDate)}
        >
          {message.text}
          {/*  TODO add animation to show date (maybe date as a separate component to be show under/above the message */}
          {toggleDate && (
            <Box sx={{ fontSize: 12 }} justifyContent={"flex-end"}>
              {format(date, isToday(date) ? "h:mm a" : "MMM dd, yyyy h:mm a")}
            </Box>
          )}
        </MessageWrapper>
      )}
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
    backgroundColor: isMessageFromLoggedInUser
      ? theme.palette.messageBackgrounds.light
      : theme.palette.messageBackgrounds.main,
    width: "max-content",
    maxWidth: "90%",
    alignSelf: isMessageFromLoggedInUser ? "flex-end" : "flex-start",
    borderRadius: 4,
    padding: 8,
    color: isMessageFromLoggedInUser ? "black" : "white",
    display: "flex",
    flexDirection: "column",
  })
);
