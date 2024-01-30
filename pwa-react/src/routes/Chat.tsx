import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import useUserStore from "../stores/UserStore";
import useAuthStore from "../stores/AuthStore";

import { Header, Wrapper, InputForm } from "../styles/Chat/UI";
import { GoArrowLeft } from "react-icons/go";

interface MessageInterface {
  messageId: number | null;
  type: string | null;
  roomId: string | null;
  sendUserId: string | null;
  message: string | null;
  contentType: string | null;
  createdAt: string | null;
}

function Chat() {
  const [messages, setMessages] = useState<MessageInterface[] | null>([]);
  const [message, setMessage] = useState("");
  const client = useRef<CompatClient>();
  const { PATH, token } = useAuthStore();
  const { coupleId, userId, name } = useUserStore();
  const { room_id } = useParams();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 웹소켓
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(`${PATH}/ws-stomp`);
      return sock;
    });
<<<<<<< HEAD
    client.current.connect({}, () => {
      if (!client.current) return;

      client.current.subscribe(`/sub/chat/room/${room_id}`, (msg) => {
        if (!msg.body) return;
        let newMsg = JSON.parse(msg.body);
        setMessages((messages) => {
          return messages ? [...messages, newMsg] : null;
=======

    client.current.connect(
      {
        Authorization: token,
      },
      () => {
        if (!client.current) return;
        // 신규 메세지 체크
        client.current.subscribe(`/sub/chat/room/${room_id}`, (msg) => {
          if (!msg.body) return;
          let newMsg = JSON.parse(msg.body);
          setMessages((messages) => {
            return messages ? [...messages, newMsg] : null;
          });
>>>>>>> 2d5114c ([update] 채팅)
        });
      }
    );
  };

  // 채팅방 끝으로 이동
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  // 정보 받아오기
  useEffect(() => {
    connectHandler();
  }, [room_id]);

  // 채팅 전송
  const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!client.current) return;
    if (message == "") return;
    let now = new Date();

    client.current.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "TALK",
        roomId: room_id,
        sendUserId: userId,
        message: message,
        createdAt: now.toLocaleString(),
      })
    );
    setMessage("");
    inputRef.current?.style.setProperty("height", "auto");
  };

  // 초기 실행 시 채팅 불러오기(1)
  const loadChat = async () => {
    const res = await axios({
      url: `${PATH}/chat/load`,
      method: `GET`,
      params: {
        roomId: room_id,
      },
      headers: {
        Authorization: token,
      },
    });
    setMessages(res.data);
  };

  // 초기 실행 시 채팅 불러오기(2)
  useEffect(() => {
    loadChat();
  }, []);

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    inputRef.current?.style.setProperty("height", "auto");
    inputRef.current?.style.setProperty(
      "height",
      inputRef.current?.scrollHeight + "px"
    );
  };

  return (
    <Wrapper>
      <Header>
        <GoArrowLeft
          onClick={() => {
            navigate("/");
          }}
        />
        <div>채팅</div>
      </Header>
      <div className="msgBox" ref={scrollRef}>
        {messages?.map((message, index) => {
          return (
            <div
              key={index}
              className={
                userId == message.sendUserId ? "myMsg line" : "oppMsg line"
              }
            >
              <div
                style={{
                  display: userId == message.sendUserId ? "block" : "none",
                }}
                className={"time"}
              >
                {message.createdAt
                  ?.substring(0, message.createdAt.length - 3)
                  .split(" ")
                  .splice(0, 3)}
                <br />
                {message.createdAt
                  ?.substring(0, message.createdAt.length - 3)
                  .split(" ")
                  .splice(3)}
              </div>
              <div className={"content"}>{message.message}</div>
              <div
                style={{
                  display: userId == message.sendUserId ? "none" : "block",
                }}
                className={"time"}
              >
                {message.createdAt
                  ?.substring(0, message.createdAt.length - 3)
                  .split(" ")
                  .splice(0, 3)}
                <br />
                {message.createdAt
                  ?.substring(0, message.createdAt.length - 3)
                  .split(" ")
                  .splice(3)}
              </div>
            </div>
          );
        })}
      </div>
      <InputForm onSubmit={sendChat}>
        <textarea
          rows={1}
          value={message}
          onChange={updateMessage}
          ref={inputRef}
        ></textarea>
        <button>전송</button>
      </InputForm>
    </Wrapper>
  );
}

export default Chat;
