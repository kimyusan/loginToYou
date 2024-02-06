package com.ssafy.spyfamily.event;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.event.CustomStompEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.messaging.SubProtocolWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Component
public class CustomStompEventListener implements ApplicationListener<CustomStompEvent> {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public CustomStompEventListener(SimpMessagingTemplate messagingTemplate, ObjectMapper objectMapper) {
        this.messagingTemplate = messagingTemplate;
        this.objectMapper = objectMapper;

    }

    @Override
    public void onApplicationEvent(CustomStompEvent event) {
        Map<String, Object> notification = new HashMap<>();
        notification.put("type", event.getEventType().toString());

        String textMessage;


        switch (event.getEventType()) {
            case SUBSCRIBE:
                textMessage = "상대방이 대화에 입장하였습니다.";
                break;
            case DISCONNECT:
                textMessage = "상대방이 대화를 종료했습니다.";
                break;
            default:
                throw new IllegalStateException("Unknown event type: " + event.getEventType());
        }
        notification.put("message", textMessage);

        // notification 객체를 JSON 문자열로 변환
        try {
            String jsonNotification = objectMapper.writeValueAsString(notification);
            messagingTemplate.convertAndSend(event.getDestination(), jsonNotification);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Could not serialize notification object to JSON", e);
        }
    }
}
