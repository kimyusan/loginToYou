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
  isKeyUp: boolean;
  setIsKeyUp: (keyUp: boolean) => void;
  sent: boolean;
  setSent: (sent: boolean) => void;
};

function MessageBox({
  messages,
  userId,
  isKeyUp,
  setIsKeyUp,
  sent,
  setSent,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { body } = document;

  // 채팅방 끝으로 이동
  useEffect(() => {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollHeight < window.innerHeight) {
      scrollRef.current.scrollTo(0, body.scrollHeight);
    } else {
      scrollRef.current.scrollIntoView({ block: "end" });
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (isKeyUp) {
      setSent(false);
      return;
    }
    if (sent && scrollRef.current.scrollHeight < window.innerHeight) {
      console.log(scrollRef.current.scrollHeight);

      setIsKeyUp(true);
      scrollRef.current.scrollIntoView({ block: "end" });
      setSent(false);
    } else {
      setIsKeyUp(false);
      setSent(false);
    }
  }, [sent]);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (!isKeyUp) {
      scrollRef.current.scrollIntoView({ block: "end" });
    }
  }, [isKeyUp]);

  return (
    <MessageWrapper
      ref={scrollRef}
      className={isKeyUp ? "keyup" : undefined}
      onMouseDown={() => {
        setIsKeyUp(false);
      }}
    >
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
