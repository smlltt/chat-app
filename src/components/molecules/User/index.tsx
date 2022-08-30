import React, { FC } from "react";
import { Card, CardHeader, Avatar, Box, Stack, Divider } from "@mui/material";
import { getConversationId, getInitials } from "utils";
import { styled } from "@mui/material/styles";
import { UserType } from "api/types";
import { useAuth } from "hooks";
import LastMessage from "./LastMessage";
import theme from "theme";

interface UserInterface {
  user: UserType;
  handleUserClick: (user: UserType) => void;
  display: "none" | "block";
  recipient?: UserType;
}

const User: FC<UserInterface> = ({
  user,
  handleUserClick,
  display,
  recipient,
}) => {
  const { user: loggedInUser } = useAuth();
  const conversationId =
    loggedInUser && getConversationId(loggedInUser.uid, user.uid);

  return (
    <StyledCard
      onClick={() => handleUserClick(user)}
      sx={{ display: { xs: display, sm: "block" } }}
      isSelected={recipient?.uid === user.uid}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <CardHeader
          avatar={<Avatar src={user.avatar}>{getInitials(user.name)}</Avatar>}
          title={
            <Stack direction={"column"}>
              <Box>{user.name}</Box>
              {conversationId && loggedInUser && (
                <LastMessage
                  conversationId={conversationId}
                  loggedInUser={loggedInUser.uid}
                />
              )}
            </Stack>
          }
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

const StyledCard = styled(Card)(({ isSelected }: { isSelected: boolean }) => ({
  cursor: "pointer",
  backgroundColor: isSelected ? theme.palette.userBackgrounds.main : undefined,
}));
