import React, { useRef, useEffect, useState } from "react";
import {
  MessageWrapper,
  MyMessage,
  OppMessage,
} from "../../styles/Chat/Message";
import { MessageInterface } from "../../interface/MessageInterface";

type Props = {
  messages: MessageInterface[];
  userId: number | null;
};

function MessageBox({ messages, userId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 채팅방 끝으로 이동
  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  return (
    <MessageWrapper ref={scrollRef} style={{ height: "auto" }}>
      {messages.map((message, index) => {
        return userId == message.sendUserId ? (
          <MyMessage key={index}>
            <div
              className={`isRead ${message.readCount ? "true" : "false"}`}
            ></div>
            <div className={"time"}>
              {message.createdAt
                ?.substring(0, message.createdAt.length - 3)
                .split(" ")
                .slice(0, 3)}
              <br />
              {message.createdAt
                ?.substring(0, message.createdAt.length - 3)
                .split(" ")
                .slice(3)}
            </div>
            <div className={"content"}>{message.message}</div>
          </MyMessage>
        ) : (
          <OppMessage key={index}>
            <div className={"content"}>{message.message}</div>
            <div className={"time"}>
              {message.createdAt
                ?.substring(0, message.createdAt.length - 3)
                .split(" ")
                .slice(0, 3)}
              <br />
              {message.createdAt
                ?.substring(0, message.createdAt.length - 3)
                .split(" ")
                .slice(3)}
            </div>
            <div
              className={`isRead ${message.readCount ? undefined : "false"}`}
            ></div>
          </OppMessage>
        );
      })}
    </MessageWrapper>
  );
}

export default MessageBox;
