import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

import useUserStore from "../stores/UserStore";
import useAuthStore from "../stores/AuthStore";

import { Wrapper, InputForm } from "../styles/Chat/UI";

interface MessageInterface {
  messageId: number | null;
  type: string | null;
  roomId: string | null;
  sendUserId: string | null;
  message: string | null;
  contentType: string | null;
}

function Chat() {
  const [messages, setMessages] = useState<MessageInterface[] | null>([]);
  const [message, setMessage] = useState("");
  const client = useRef<CompatClient>();
  const { PATH } = useAuthStore();
  const { coupleId, userId, name } = useUserStore();
  const { room_id } = useParams();

  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(`${PATH}/ws-stomp`);
      return sock;
    });
    client.current.connect({}, () => {
      if (!client.current) return;
      // 신규 메세지 체크
      client.current.subscribe(`/sub/chat/room/${room_id}`, (msg) => {
        if (!msg.body) return;
        let newMsg = JSON.parse(msg.body);
        console.log(newMsg);
        setMessages((messages) => {
          return messages ? [...messages, newMsg] : null;
        });
      });
    });
  };

  useEffect(() => {
    connectHandler();
  }, [room_id]);

  const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!client.current) return;
    if (message == "") return;
    client.current.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "TALK",
        roomId: room_id,
        sendUserId: userId,
        message: message,
      })
    );
    setMessage("");
  };

  const loadChat = async () => {
    const res = await axios({
      url: `${PATH}/chat/load`,
      method: `GET`,
      params: {
        roomId: room_id,
      },
    });
    setMessages(res.data);
  };

  useEffect(() => {
    loadChat();
  }, []);

  const updateMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Wrapper>
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            className={userId == message.sendUserId ? "myMsg" : "oppMsg"}
          >
            {message.message}
          </div>
        );
      })}
      <InputForm onSubmit={sendChat}>
        <input type="text" value={message} onChange={updateMessage} />
        <button>전송</button>
      </InputForm>
    </Wrapper>
  );
}

export default Chat;
