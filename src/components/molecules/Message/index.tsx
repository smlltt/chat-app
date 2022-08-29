import React, { FC, useState } from "react";
import { ChatType } from "api/types";
import { Box, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ApiFirebase } from "api";
import theme from "theme";
import { format, isToday } from "date-fns";
import { useAuth } from "hooks";
import Collapse from "@mui/material/Collapse";

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
        </MessageWrapper>
      )}
      {message.file && (
        <CardMedia
          component="img"
          alt="picture"
          image={message.file}
          onClick={() => window.open(message.file)}
          sx={{
            height: 100,
            width: 100,
            ml: isMessageFromLoggedInUser ? "auto" : undefined,
            borderRadius: 1,
          }}
        />
      )}
      <Collapse in={toggleDate}>
        <DateWrapper isMessageFromLoggedInUser={isMessageFromLoggedInUser}>
          {format(date, isToday(date) ? "h:mm a" : "MMM dd, yyyy h:mm a")}
        </DateWrapper>
      </Collapse>
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

const DateWrapper = styled(Box)(
  ({ isMessageFromLoggedInUser }: { isMessageFromLoggedInUser: boolean }) => ({
    justifyContent: isMessageFromLoggedInUser ? "flex-end" : "flex-start",
    fontSize: 12,
    paddingTop: 4,
    display: "flex",
  })
);
