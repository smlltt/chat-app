import React, { FC } from "react";
import { Card, CardHeader, Avatar, Box, Stack, Divider } from "@mui/material";
import { getInitials } from "utils";
import { styled } from "@mui/material/styles";
import { DocumentData } from "firebase/firestore";

interface UserInterface {
  user: DocumentData;
  handleUserClick: (user: DocumentData) => void;
  display: "none" | "block";
}

const User: FC<UserInterface> = ({ user, handleUserClick, display }) => {
  return (
    <StyledCard
      onClick={() => handleUserClick(user)}
      sx={{ display: { xs: display, sm: "block" } }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <CardHeader
          avatar={<Avatar src={user.avatar}>{getInitials(user.name)}</Avatar>}
          title={user.name}
        />
        <Box display={"flex"} alignItems={"center"} mr={2}>
          <IsOnlineDot isOnline={user.isOnline} />
        </Box>
      </Stack>
      <Divider />
    </StyledCard>
  );
};

export default User;

const IsOnlineDot = styled(Box)(({ isOnline }: { isOnline: boolean }) => ({
  height: "10px",
  width: "10px",
  backgroundColor: isOnline ? "green" : "red",
  borderRadius: "50%",
}));

const StyledCard = styled(Card)({
  cursor: "pointer",
});
