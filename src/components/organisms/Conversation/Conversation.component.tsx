import React, { FC } from "react";
import { ChatsWrapper } from "components/layouts";
import { DocumentData } from "firebase/firestore";
import { MessageForm } from "components/organisms";
import ConversationHeader from "./ConversationHeader";

interface ConversationComponentProps {
  chat: DocumentData | undefined;
}

const ConversationComponent: FC<ConversationComponentProps> = ({ chat }) => {
  return (
    <ChatsWrapper xs={7} sm={8} sx={{ borderLeft: "1px solid lightGrey" }}>
      {chat ? (
        <>
          <ConversationHeader content={chat.name} />
          {/*TODO compoenent to be added*/}
          <div style={{ display: "flex", flexGrow: 1 }}>messages</div>
          <MessageForm />
        </>
      ) : (
        <ConversationHeader content={"Select a user to start a conversation"} />
      )}
    </ChatsWrapper>
  );
};

export default ConversationComponent;
