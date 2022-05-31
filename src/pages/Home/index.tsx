import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Users, Conversation } from "components/organisms";
import { DocumentData } from "firebase/firestore";

const Home = () => {
  const [chat, setChat] = useState<DocumentData | undefined>(undefined);

  return (
    <Grid container>
      <Users selectUser={(user: DocumentData) => setChat(user)} />
      <Conversation chat={chat} />
    </Grid>
  );
};

export default Home;
