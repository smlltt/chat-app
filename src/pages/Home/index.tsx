import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Users, Conversation } from "components/organisms";
import { DocumentData } from "firebase/firestore";
import { ShowUsers } from "./types";

const Home = () => {
  const [chat, setChat] = useState<DocumentData | undefined>(undefined);
  const [showUsers, setShowUsers] = useState<ShowUsers>({
    usersWrapperSpace: 2,
    usersDisplay: "block",
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
        selectUser={(user: DocumentData) => setChat(user)}
        handleHamurgerClick={toggleShowUsers}
        showUsers={showUsers}
      />
      <Conversation chat={chat} showUsers={showUsers} />
    </Grid>
  );
};

export default Home;
