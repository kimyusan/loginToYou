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
  const [wh, setWh] = useState(0);

  const absolute = () => {
    if (!scrollRef.current) return;
    scrollRef.current.style.position = "fixed";
    scrollRef.current.style.top = `${wh - window.innerHeight}px`;
    scrollRef.current.style.height = `${window.innerHeight}px`;
    scrollRef.current.style.overflowY = `auto`;
    scrollRef.current.scrollTo(0, 99999999);
  };

  const block = () => {
    if (!scrollRef.current) return;
    scrollRef.current.style.position = "block";
    scrollRef.current.style.height = `auto`;
    scrollRef.current.style.removeProperty("top");
  };

  // 채팅방 끝으로 이동
  useEffect(() => {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollHeight < wh) {
      absolute();
    } else {
      block();
      scrollRef.current?.scrollIntoView({ block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    setWh(window.innerHeight);
  }, []);

  return (
    <MessageWrapper ref={scrollRef} onBlur={block}>
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
