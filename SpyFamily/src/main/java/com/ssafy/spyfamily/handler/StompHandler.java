package com.ssafy.spyfamily.handler;

// import ... 생략

import com.ssafy.spyfamily.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JWTUtil jwtTokenProvider;

    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("채널인터셉터 시작");
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println(message.toString()+ " stomphandler");
        // websocket 연결시 헤더의 jwt token 검증
        System.out.println("stomp handler 까지 접속 은 됐음");
        if (StompCommand.CONNECT == accessor.getCommand()) {
            jwtTokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization"));
        }
        return message;
    }
}