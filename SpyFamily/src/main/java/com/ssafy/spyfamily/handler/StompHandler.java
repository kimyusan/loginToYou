package com.ssafy.spyfamily.handler;

// import ... 생략

import com.ssafy.spyfamily.chat.repo.ChatRoomRepo;
import com.ssafy.spyfamily.chat.repo.ChatRoomRepository;
import com.ssafy.spyfamily.event.CustomStompEvent;
import com.ssafy.spyfamily.event.SubscriptionTrackingService;
import com.ssafy.spyfamily.util.JWTUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@Transactional
public class StompHandler implements ChannelInterceptor {

    private final JWTUtil jwtUtil;
    private final ApplicationEventPublisher eventPublisher;


    private final ChatRoomRepo chatRoomRepository;
    public StompHandler(JWTUtil jwtUtil, ApplicationEventPublisher eventPublisher, SubscriptionTrackingService subscriptionTrackingService, ChatRoomRepo chatRoomRepository) {
        this.jwtUtil = jwtUtil;
        this.eventPublisher = eventPublisher;
        this.chatRoomRepository = chatRoomRepository;

    }

    private List<Map<String, String>> sessionInfos = new ArrayList<>();
    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("채널인터셉터 시작");
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info(message.toString() + " stomphandler");
        // websocket 연결시 헤더의 jwt token 검증
        log.info("stomp handler 까지 접속 은 됐음");



        // 확인하세요 ** 토큰값이 유효할때 채팅이 되야하는데 invaled jwt 토큰이 뜸 일단 주석처리 해놨음 나중에 풀고 인증 처리 해보세요.

        if (StompCommand.CONNECT == accessor.getCommand()) {
            log.info("connect 성공");
//            jwtUtil.validateToken(accessor.getFirstNativeHeader("Authorization"));
            log.info("accessor값 확인" + accessor.getFirstNativeHeader("Authorization").toString());


        }

        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            String destination = accessor.getDestination();
            eventPublisher.publishEvent(new CustomStompEvent(this, destination, CustomStompEvent.EventType.SUBSCRIBE));
            String sessionId = accessor.getSessionId();
            log.info("subscribe 정보" + accessor.toString());

            try {
                String roomId = destination.split("/")[4];
                chatRoomRepository.loginChatRoom(roomId);
            }catch (Exception e) {
                e.printStackTrace();
            }


            Map<String, String> temp = new HashMap<>();
            temp.put("sessionId", sessionId);
            temp.put("destination", destination);

            sessionInfos.add(temp);


        }



        if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
           String  sessionId = accessor.getSessionId();
           String destination = null;
           for(int i = 0 ; i < sessionInfos.size() ; i++){
               if(sessionInfos.get(i).get("sessionId").equals(sessionId)){
                   destination = sessionInfos.get(i).get("destination");
                   String roomId = destination.split("/")[4];
                   chatRoomRepository.logoutChatRoom(roomId);
                    sessionInfos.remove(i);

                    break;

               }
           }
            eventPublisher.publishEvent(new CustomStompEvent(this, destination, CustomStompEvent.EventType.DISCONNECT));
        }

            return message;

    }
}