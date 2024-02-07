package com.ssafy.spyfamily.chat.controller;


import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.service.ChatServiceImpl;
import com.ssafy.spyfamily.util.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatServiceImpl chatService ;

    private final JWTUtil jwtUtil;
    public ChatController(SimpMessageSendingOperations messagingTemplate, ChatServiceImpl chatService,JWTUtil jwtUtil){
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
        this.jwtUtil = jwtUtil;
    }


    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        log.info("/chat/message 실행" + message.toString());

        // 유저가 입장했을때 이전 채팅 읽음 처리
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
                chatService.readUser(message.getRoomId(), message.getSendUserId());
        }

        //메세지를 전송해줌
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
        //메세지db 저장
        chatService.save(message);
    }

    //    @MessageMapping("/chat/message")
//    public void message(ChatMessage message, @Header("Authorization") String authorization) {
//
//        System.out.println("/chat/message 입장");
//        String[] token = authorization.split(" ");
//        String nicname = jwtUtil.getUsername(token[1]);
//
//        System.out.println(message.toString());
//
//        //System.out.println(nicname);
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(nicname + "님이 입장하셨습니다.");
//
//            chatService.readUser(message.getRoomId(), message.getSendUserId());
//        }
//
//
//        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
//
//        chatService.save(message);
//    }
}
