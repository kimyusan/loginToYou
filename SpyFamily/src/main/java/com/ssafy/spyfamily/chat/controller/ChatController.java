package com.ssafy.spyfamily.chat.controller;


import com.ssafy.spyfamily.chat.model.ChatMessage;
import com.ssafy.spyfamily.chat.service.ChatServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@Slf4j
@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatServiceImpl chatService ;

    public ChatController(SimpMessageSendingOperations messagingTemplate, ChatServiceImpl chatService){
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType()))
            message.setMessage(message.getSendUserId() + "님이 입장하셨습니다.");


        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
        chatService.save(message);
    }
}
