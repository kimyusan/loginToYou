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


        // 꼭확인하세요 ** 토큰값이 유효할때 채팅이 되야하는데 invaled jwt 토큰이 뜸 일단 주석처리 해놨음 나중에 풀고 꼭 인증 처리 해주어야합니다.
        if (StompCommand.CONNECT == accessor.getCommand()) {
            System.out.println("connect 성공");
//            jwtTokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization"));

            System.out.println("accessor값 확인" + accessor.getFirstNativeHeader("Authorization").toString());
        }


        return message;
    }
}