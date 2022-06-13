import React, { FC } from "react";
import { TextField, Stack, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FileUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { MessageFormValuesProps } from "./types";

interface MessageFormComponentProps {
  handleSubmit: (values: MessageFormValuesProps) => Promise<void>;
}

const MessageFormComponent: FC<MessageFormComponentProps> = ({
  handleSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      text: "",
      file: undefined,
    },
    onSubmit: (values: MessageFormValuesProps) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction={"row"}>
        <StyledLabel htmlFor="icon-button-file">
          <HiddenInput
            accept="image/*,,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
            id="icon-button-file"
            type="file"
            name={"file"}
            onChange={(e) => {
              if (!e.target.files) {
                return;
              }
              formik.setFieldValue("file", e.target.files[0]);
            }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FileUpload />
          </IconButton>
        </StyledLabel>
        <Stack flexGrow={1}>
          <TextField
            label={"Enter message"}
            id="text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
          />
        </Stack>
        <Button sx={{ px: 3 }} type="submit">
          Send
        </Button>
      </Stack>
    </form>
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
