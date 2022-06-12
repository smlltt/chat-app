import React, { FC } from "react";
import { ChatsWrapper } from "components/layouts";
import { DocumentData } from "firebase/firestore";
import { Divider, Stack } from "@mui/material";

interface ConversationComponentProps {
  chat: DocumentData | undefined;
}

const ConversationComponent: FC<ConversationComponentProps> = ({ chat }) => {
  return (
    <ChatsWrapper xs={7} sm={8} sx={{ borderLeft: "1px solid lightGrey" }}>
      <Stack justifyContent={"center"} direction={"row"} py={"27px"}>
        {chat ? chat.name : "Select a user to start a conversation"}
      </Stack>
      <Divider />
    </ChatsWrapper>
  );
};

export default ConversationComponent;
