import React, { FC } from "react";
import { TextField, Stack, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FileUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const MessageFormComponent: FC = () => {
  return (
    <Stack direction={"row"}>
      <StyledLabel htmlFor="icon-button-file">
        <HiddenInput accept="image/*" id="icon-button-file" type="file" />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <FileUpload />
        </IconButton>
      </StyledLabel>
      <Stack flexGrow={1}>
        <TextField label={"Enter message"} />
      </Stack>
      <Button sx={{ px: 3 }}>Send</Button>
    </Stack>
  );
};

export default MessageFormComponent;

const HiddenInput = styled("input")({
  display: "none",
});

const StyledLabel = styled("label")({
  paddingLeft: 15,
  paddingRight: 15,
});
