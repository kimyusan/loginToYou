import React, { useRef } from "react";
import { InputForm } from "../../styles/Chat/UI";
import { CompatClient } from "@stomp/stompjs";
import { TextInput } from "react-native";
import useAuthStore from "../../stores/AuthStore";

type Props = {
  message: string;
  setMessage: (message: string) => void;
  client: React.MutableRefObject<CompatClient | undefined>;
  userId: number | null;
  roomId: string | undefined;
  isOppOn: boolean;
};

function InputBox({
  message,
  setMessage,
  client,
  userId,
  roomId,
  isOppOn,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const token = useAuthStore.getState().token;

  const updateMessage = (data: string) => {
    setMessage(data);
    // inputRef.current?.style.setProperty("height", "auto");
    // inputRef.current?.style.setProperty(
    //   "height",
    //   inputRef.current?.scrollHeight + "px"
    // );
  };

  // // 채팅 전송
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
    // inputRef.current?.style.setProperty("height", "auto");
    // inputRef.current?.focus();
  };

  return (
    <InputForm onSubmit={sendChat}>
      <TextInput value={message} onChangeText={updateMessage} ref={inputRef} />
      <button
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        전송
      </button>
    </InputForm>
  );
}

export default InputBox;
