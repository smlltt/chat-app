import React, { ChangeEvent, FC } from "react";
import {
  Card,
  Stack,
  Avatar,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Delete from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { getInitials } from "utils";
import { DocumentData } from "firebase/firestore";

interface ProfileComponentProps {
  handleImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  user?: DocumentData;
  loading: boolean;
  handleDeleteClick: () => void;
}

const ProfileComponent: FC<ProfileComponentProps> = ({
  handleImageSelect,
  user,
  loading,
  handleDeleteClick,
}) => {
  return !!user ? (
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
            <StyledAvatar
              src={user.avatar}
              className={"avatar"}
              loading={loading}
            >
              {getInitials(user.name)}
            </StyledAvatar>
            <UploadIconWrapper className={"addImageIcon"} loading={loading}>
              {loading ? (
                <StyledCircularProgress loading />
              ) : (
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => handleImageSelect(e)}
                  />
                  <IconButton aria-label="upload picture" component="span">
                    <PhotoCamera color="primary" />
                    {user.avatar && (
                      <Delete
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteClick();
                        }}
                        color={"error"}
                      />
                    )}
                  </IconButton>
                </label>
              )}
            </UploadIconWrapper>
          </ImageAndIconWrapper>
          <Stack direction={"column"}>
            <Stack justifyContent={"center"}>
              <Typography variant={"h5"}>{user.name}</Typography>
              <Typography variant={"h6"}>{user.email}</Typography>
            </Stack>
            <Stack direction={"column"} mt={"auto"}>
              <Divider />
              <Typography>
                Joined on: {user.createdAt.toDate().toDateString()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </StyledCard>
    </Stack>
  ) : null;
};

export default ProfileComponent;

const StyledCard = styled(Card)({
  minWidth: 300,
  maxWidth: 600,
});

const StyledAvatar = styled(Avatar)<{ loading: boolean }>(({ loading }) => ({
  width: 100,
  height: 100,
  transition: ".5s ease",
  opacity: loading ? 0.4 : 1,
}));

const StyledCircularProgress = styled(CircularProgress)<{ loading: boolean }>(
  ({ loading }) => ({
    opacity: loading ? 1 : 0,
  })
);

const Input = styled("input")({
  display: "none",
});

const UploadIconWrapper = styled(Box)<{ loading: boolean }>(({ loading }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: ".5s ease",
  opacity: loading ? 1 : 0,
}));

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
