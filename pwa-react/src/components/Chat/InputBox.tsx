import React, { useRef } from "react";
import { InputForm } from "../../styles/Chat/UI";
import { CompatClient } from "@stomp/stompjs";
import useAuthStore from "../../stores/AuthStore";
import { IconContext } from "react-icons";
import { FaPhone } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

type Props = {
  message: string;
  setMessage: (message: string) => void;
  client: React.MutableRefObject<CompatClient | undefined>;
  userId: number | null;
  roomId: string | undefined;
  isOppOn: boolean;
  isKeyUp: boolean;
  setIsKeyUp: (up: boolean) => void;
  setSent: (sent: boolean) => void;
};

function InputBox({
  message,
  setMessage,
  client,
  userId,
  roomId,
  isOppOn,
  isKeyUp,
  setSent,
  setIsKeyUp,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const token = useAuthStore.getState().token;
  const navigate = useNavigate();

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    inputRef.current?.style.setProperty("height", "auto");
    inputRef.current?.style.setProperty(
      "height",
      inputRef.current?.scrollHeight + "px"
    );
  };

  // 채팅 전송
  const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(isOppOn);

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
        roomId: roomId,
        sendUserId: userId,
        message: message,
        createdAt: now.toLocaleString(),
        readCount: isOppOn ? false : true,
      })
    );
    setMessage("");
    inputRef.current?.style.setProperty("height", "auto");
    inputRef.current?.focus();
    setSent(true);
  };

  return (
    <InputForm
      onSubmit={sendChat}
      className={isKeyUp ? "keyup" : undefined}
      onBlur={() => {
        setIsKeyUp(false);
      }}
    >
      <IconContext.Provider value={{ size: "20px" }}>
        <FaPhone
          onClick={() => {
            navigate("/chat/video");
          }}
          style={{ marginRight: "5px" }}
        />
      </IconContext.Provider>
      <textarea
        rows={1}
        value={message}
        onChange={updateMessage}
        ref={inputRef}
      ></textarea>
      <button>전송</button>
    </InputForm>
  );
}

export default InputBox;
