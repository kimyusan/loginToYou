import React, { useEffect, useRef, useState } from "react";
// import { Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { useParams } from "react-router-dom";
// import useUserStore from "../stores/UserStore";
// import axios from "axios";
// import useAuthStore from "../stores/AuthStore";

function Chat() {
  // const sock = new SockJS("http://i10c105.p.ssafy.io:3000/ws-stomp");
  // const ws = Stomp.over(sock);
  // const reconnect = 0;

  // const { userId } = useUserStore();
  // const { room_id } = useParams();
  // const { PATH } = useAuthStore();
  // const [chatlog, setChatlog] = useState([]);

  // const findroom = async () => {
  //   const roomData = await axios({
  //     url: `${PATH}/chat/room/${room_id}`,
  //     method: "get",
  //   });
  //   // setChatlog(roomData);
  // };

  // useEffect(() => {
  //   findroom();
  // }, []);

  return <div>Chat</div>;
}

export default Chat;
