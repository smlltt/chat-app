import React, { FC } from "react";
import { ChatType } from "api/types";
import { Box, Card, CardMedia } from "@mui/material";

interface MessageProps {
  message: ChatType;
}

const Message: FC<MessageProps> = ({ message }) => {
  return (
    <Box>
      {message.text && message.text}
      {message.file && (
        <Card>
          <CardMedia component="img" alt="picture" image={message.file} />
        </Card>
      )}
    </Box>
  );
};

export default Message;
