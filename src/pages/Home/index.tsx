import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Users, Conversation } from "components/organisms";
import { ShowUsers } from "./types";
import { auth } from "config/firebase";
import { UserType } from "api/types";
import { getConversationId } from "utils";

const Home = () => {
  const loggedUserId = auth.currentUser?.uid;
  const [recipient, setRecipient] = useState<UserType | undefined>(undefined);
  const [showUsers, setShowUsers] = useState<ShowUsers>({
    usersWrapperSpace: 2,
    usersDisplay: "none",
    conversationWrapperSpace: 10,
  });
  const [conversationId, setConversationId] = useState("");

  const toggleShowUsers = () => {
    showUsers.usersWrapperSpace === 5
      ? setShowUsers({
          usersWrapperSpace: 2,
          usersDisplay: "none",
          conversationWrapperSpace: 10,
        })
      : setShowUsers({
          usersWrapperSpace: 5,
          usersDisplay: "block",
          conversationWrapperSpace: 7,
        });
  };

  const handleSelectUser = (user: UserType) => {
    if (!loggedUserId) return;
    setRecipient(user);
    setConversationId(getConversationId(loggedUserId, user.uid));
  };

  return (
    <Grid container>
      <Users
        loggedUserId={loggedUserId}
        selectUser={handleSelectUser}
        handleHamurgerClick={toggleShowUsers}
        showUsers={showUsers}
      />
      <Conversation
        recipient={recipient}
        showUsers={showUsers}
        senderId={loggedUserId}
        conversationId={conversationId}
      />
    </Grid>
  );
};

export default Home;
