import React from "react";
import { Card, Stack, Avatar, Typography, Box, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Profile = () => {
  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      alignContent={"center"}
      pt={5}
      px={2}
    >
      <StyledCard>
        <Stack direction="row" p={3} spacing={3}>
          <ImageAndIconWrapper>
            <StyledAvatar src={"assets/sojka.jpg"} className={"avatar"} />
            <UploadIconWrapper className={"addImageIcon"}>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </UploadIconWrapper>
          </ImageAndIconWrapper>
          <Stack direction={"column"}>
            <Stack justifyContent={"center"}>
              <Typography variant={"h5"}>Name Surname</Typography>
              <Typography variant={"h6"}>user email</Typography>
            </Stack>
            <Stack direction={"column"} mt={"auto"}>
              <Divider />
              <Typography>Joined on: ...</Typography>
            </Stack>
          </Stack>
        </Stack>
      </StyledCard>
    </Stack>
  );
};

export default Profile;

const StyledCard = styled(Card)({
  minWidth: 300,
  maxWidth: 600,
});

const StyledAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  transition: ".5s ease",
});

const Input = styled("input")({
  display: "none",
});

const UploadIconWrapper = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: ".5s ease",
  opacity: 0,
});

const ImageAndIconWrapper = styled(Box)({
  position: "relative",
  "&:hover": {
    "& .addImageIcon": {
      opacity: 1,
    },
    "& .avatar": {
      opacity: 0.4,
    },
  },
});
