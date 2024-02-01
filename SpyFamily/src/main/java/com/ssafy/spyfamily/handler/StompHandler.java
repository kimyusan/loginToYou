package com.ssafy.spyfamily.handler;

// import ... 생략

import com.ssafy.spyfamily.event.CustomStompEvent;
import com.ssafy.spyfamily.event.SubscriptionTrackingService;
import com.ssafy.spyfamily.util.JWTUtil;
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
public class StompHandler implements ChannelInterceptor {

    private final JWTUtil jwtUtil;
    private final ApplicationEventPublisher eventPublisher;


    public StompHandler(JWTUtil jwtUtil, ApplicationEventPublisher eventPublisher) {
        this.jwtUtil = jwtUtil;
        this.eventPublisher = eventPublisher;

    }

    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("채널인터셉터 시작");
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info(message.toString() + " stomphandler");
        // websocket 연결시 헤더의 jwt token 검증
        log.info("stomp handler 까지 접속 은 됐음");
//        String sessionId = accessor.getSessionId();
//        String destination = accessor.getDestination();
//
//        List<Map<String, String>> sessionInfo = new ArrayList<>();
//        Map<String, String> temp = new HashMap<>();
//        temp.put("sessionId", sessionId);
//        temp.put("destination",destination);
//
//        sessionInfo.add(temp);


        // 꼭확인하세요 ** 토큰값이 유효할때 채팅이 되야하는데 invaled jwt 토큰이 뜸 일단 주석처리 해놨음 나중에 풀고 꼭 인증 처리 해주어야합니다.
        if (StompCommand.CONNECT == accessor.getCommand()) {
            log.info("connect 성공");
//            jwtUtil.validateToken(accessor.getFirstNativeHeader("Authorization"));
            log.info("accessor값 확인" + accessor.getFirstNativeHeader("Authorization").toString());


        }

        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            String destination = accessor.getDestination();
            eventPublisher.publishEvent(new CustomStompEvent(this, destination, CustomStompEvent.EventType.SUBSCRIBE));


//            log.info("세션Id" + sessionId);
//        } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
//            // 세션 ID를 얻어서 해당 세션의 구독을 관리하거나, 어떠한 추가 작업으로 destination을 결정할 수 있음
//            String destination = accessor.getDestination();// 예시로 사용할 destination 값입니다.
//            log.info("disconnect" + sessionId);
////            eventPublisher.publishEvent(new CustomStompEvent(this, destination, CustomStompEvent.EventType.DISCONNECT));
////
//        }

//        if (StompCommand.DISCONNECT == accessor.getCommand()) {
//            String destination = accessor.getDestination(); // 구독 대상 목적지
//            log.info(destination + "대화 종료");
//            String notification = "상대방이 대화를 종료했습니다 " ;
//
//            // 해당 destination을 구독하고 있는 모든 클라이언트에게 알림 메시지 전송
//            messagingTemplate.convertAndSend(destination, notification);
//
//        }
        }

            return message;

    }
}