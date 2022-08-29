import React, { FC } from "react";
import { TextField, Stack, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FileUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { MessageFormValuesProps } from "./types";
import { ShowUsers } from "pages/Home/types";

interface MessageFormComponentProps {
  handleSubmit: (values: MessageFormValuesProps) => Promise<void>;
  showUsers: ShowUsers;
}

const MessageFormComponent: FC<MessageFormComponentProps> = ({
  handleSubmit,
  showUsers,
}) => {
  const formik = useFormik({
    initialValues: {
      text: "",
      file: undefined,
    },
    onSubmit: (values: MessageFormValuesProps, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        direction={"row"}
        sx={{
          position: "absolute",
          bottom: 0,
          width: {
            xs: showUsers.usersDisplay === "block" ? "58%" : "80%",
            sm: "66%",
          },
        }}
      >
        <StyledLabel htmlFor="icon-button-file">
          <HiddenInput
            accept="image/*"
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
            label={showUsers.usersDisplay === "block" ? "" : "Hey :)"}
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
