import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Users, Conversation } from "components/organisms";
import { ShowUsers } from "./types";
import { auth } from "config/firebase";
import { UserType } from "api/types";

const Home = () => {
  const loggedUserId = auth.currentUser?.uid;
  const [recipient, setRecipient] = useState<UserType | undefined>(undefined);
  const [showUsers, setShowUsers] = useState<ShowUsers>({
    usersWrapperSpace: 2,
    usersDisplay: "none",
    conversationWrapperSpace: 10,
  });

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

  return (
    <Grid container>
      <Users
        loggedUserId={loggedUserId}
        selectUser={(user: UserType) => setRecipient(user)}
        handleHamurgerClick={toggleShowUsers}
        showUsers={showUsers}
      />
      <Conversation
        recipient={recipient}
        showUsers={showUsers}
        senderId={loggedUserId}
      />
    </Grid>
  );
};

export default Home;
