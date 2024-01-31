import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { axiosAuth } from "../util/token";

import useUserStore from "../stores/UserStore";
import useAuthStore from "../stores/AuthStore";
import { useShallow } from "zustand/react/shallow";

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
  readCount: boolean | true;
}

function Chat() {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [showMessages, setShowMessages] = useState<MessageInterface[]>([]);
  const [message, setMessage] = useState("");
  const client = useRef<CompatClient>();
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const { coupleId, userId, name } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      coupleId: state.coupleId,
      name: state.name,
    }))
  );
  const navigate = useNavigate();
  const { room_id } = useParams();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showChatNum, setShowChatNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updateRead = async () => {
    await axiosAuth.post(
      "/chat/readUser",
      {},
      {
        params: {
          roomId: room_id,
          userId: userId,
        },
      }
    );
  };

  // 소켓 연결 함수
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(`${PATH}/ws-stomp`, null);
      return sock;
    });

    client.current.connect(
      {
        Authorization: token,
      },
      () => {
        if (!client.current) return;
        if (!token) return;
        updateRead();

        // 신규 메세지 체크
        client.current.subscribe(
          `/sub/chat/room/${room_id}`,
          (msg) => {
            if (!msg.body) return;
            let newMsg = JSON.parse(msg.body);

            setShowMessages((showMessages) => {
              return showMessages ? [...showMessages, newMsg] : [newMsg];
            });

            updateRead();
          },
          {
            Authorization: token,
          }
        );
      }
    );
  };

  // 채팅방 끝으로 이동
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [showMessages]);

  // 정보 받아오기
  useEffect(() => {
    connectHandler();
  }, [room_id]);

  // // 채팅 전송
  const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!client.current) return;
    if (message == "") return;

    let now = new Date();

    client.current.send(
      `/pub/chat/message`,
      {
        Authorization: token,
      },
      JSON.stringify({
        type: "TALK",
        roomId: room_id,
        sendUserId: userId,
        message: message,
        createdAt: now.toLocaleString(),
        readCount: true,
      })
    );
    setMessage("");
    inputRef.current?.style.setProperty("height", "auto");
  };

  // 초기 실행 시 채팅 불러오기(1)
  const loadChat = async () => {
    const res = await axiosAuth("chat/load", {
      params: {
        roomId: room_id,
      },
    });

    // 원본 배열 저장
    setMessages((prev) => {
      return res.data;
    });

    // 미로드된 메세지 갯수 지정 (초기 최대 50개까지 보임)
    setShowChatNum((num) =>
      res.data.length - 50 > 0 ? res.data.length - 50 : 0
    );

    // 보일 메세지 배열 세팅
    setShowMessages((prev) => {
      return res.data.slice(res.data.length - 50, res.data.length);
    });
  };

  // 위로 스크롤 시 추가 로딩 함수
  const addScroll = () => {
    if (document.documentElement.scrollTop < 100) {
      if (!messages || messages.length < 50) return;
      if (!showMessages || showMessages.length < 50) return;
      if (!isLoading) setIsLoading(true);
    }
  };

  useEffect(() => {
    if (!isLoading) return;

    let prevHeight = document.documentElement.scrollHeight;
    console.log("대화 내용을 불러옵니다:남은 대회 갯수", showChatNum);

    if (showChatNum > 0) {
      setShowMessages((message) => {
        return message
          ? [
              ...messages.slice(
                showChatNum - 50 > 0 ? showChatNum - 50 : 0,
                showChatNum
              ),
              ...message,
            ]
          : [];
      });

      setTimeout(() => {
        document.documentElement.scrollTop =
          document.documentElement.scrollHeight - prevHeight;
      }, 1);

      setShowChatNum((num) => {
        if (num - 50 <= 0) window.removeEventListener("scroll", addScroll);
        return num - 50 > 0 ? num - 50 : 0;
      });
    }
    setIsLoading(false);
  }, [isLoading]);

  const updateReadCount = () => {
    setShowMessages((messages) => {
      return messages.map((each) => ({ ...each, readCount: true }));
    });
  };

  // 초기 실행 시 채팅 불러오기(2)
  useEffect(() => {
    loadChat();
    return () => {
      client.current?.disconnect();
    };
  }, []);

  // infinite loading을 위한 event 추가
  useEffect(() => {
    window.addEventListener("scroll", addScroll);
    return () => window.removeEventListener("scroll", addScroll);
  }, [messages]);

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
        {showMessages?.map((message, index) => {
          return (
            <div
              key={index}
              className={
                userId == message.sendUserId ? "myMsg line" : "oppMsg line"
              }
              id={`msg${index}`}
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
                  .slice(0, 3)}
                <br />
                {message.createdAt
                  ?.substring(0, message.createdAt.length - 3)
                  .split(" ")
                  .slice(3)}
              </div>
              <div className={"content"}>{message.message}</div>
              <div>{message.readCount ? "안읽음" : "읽음"}</div>
              <div
                style={{
                  display: userId == message.sendUserId ? "none" : "block",
                }}
                className={"time"}
              >
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
