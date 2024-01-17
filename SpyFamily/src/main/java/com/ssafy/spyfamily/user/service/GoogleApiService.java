package com.ssafy.spyfamily.user.service;

import com.ssafy.spyfamily.user.model.UserInfo;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleApiService {

    private final RestTemplate restTemplate;

    public GoogleApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public UserInfo getUserInfo(String accessToken) {
        // Google API의 유저 정보를 얻기 위한 엔드포인트
        String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        // HTTP 요청 생성
        HttpEntity entity = new HttpEntity(headers);

        // Google API에 GET 요청을 보내고 응답을 UserInfo 클래스로 매핑
//        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<UserInfo> response = restTemplate.exchange(
                userInfoEndpoint,
                HttpMethod.GET,
                entity,
                UserInfo.class
        );

        // 응답 결과 반환
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            // 오류 처리
            throw new RuntimeException("Failed to retrieve user information from Google API");
        }
    }
}
