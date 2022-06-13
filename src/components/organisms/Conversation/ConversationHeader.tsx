import React, { FC } from "react";
import { Divider, Stack } from "@mui/material";

interface ConversationHeaderProps {
  content: string;
}

const ConversationHeader: FC<ConversationHeaderProps> = ({ content }) => (
  <>
    <Stack justifyContent={"center"} direction={"row"} py={"27px"}>
      {content}
    </Stack>
    <Divider />
  </>
);

export default ConversationHeader;
