package com.ssafy.spyfamily.user.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.user.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final RestTemplate restTemplate;

    @Autowired
    public UserService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public UserInfo getGoogleUserInfo(String accessToken) {
        // Google API의 유저 정보를 얻기 위한 엔드포인트
        String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        // HTTP 요청 생성
        HttpEntity entity = new HttpEntity(headers);

        // Google API에 GET 요청을 보내고 응답을 UserInfo 클래스로 매핑
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


    public UserInfo getNaverUserInfo(String accessToken) {
        // Google API의 유저 정보를 얻기 위한 엔드포인트
        String userInfoEndpoint = "https://openapi.naver.com/v1/nid/me";

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        // HTTP 요청 생성
        HttpEntity entity = new HttpEntity(headers);

        // Google API에 GET 요청을 보내고 응답을 UserInfo 클래스로 매핑
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

    public ResponseEntity<UserInfo> getKakaoPost(String code) {
        // Kakao API 요청을 위한 정보
        String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
        String grantType = "authorization_code";
        String clientId = "5a8a53240d6799ecf38d7454ab5579b3";
        String redirectUri = "http://localhost:3000";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // 파라미터 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        // 요청 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // Kakao API에 POST 요청
        ResponseEntity<UserInfo> responseEntity = new RestTemplate().postForEntity(kakaoTokenUrl, request, UserInfo.class);
        return responseEntity;
    }

    public ResponseEntity<UserInfo> getNaverPost(String code, String state) {
        String naver_url = "https://nid.naver.com/oauth2.0/token";
        String clientId = "H3hbCg2IUznqo9J6IdEO";
        String Client_Secret = "YnfC2lwoGL";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // 파라미터 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", Client_Secret);
        params.add("grant_type", "authorization_code");
        params.add("state", state);
        params.add("code", code);

        // 요청 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // naver API에 POST 요청
        ResponseEntity<UserInfo> responseEntity = new RestTemplate().postForEntity(naver_url, request, UserInfo.class);

        return responseEntity;
    }

    public static Map<String, String> convertJsonToMap(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> dataMap = new HashMap<>();

        try {
            // JSON 문자열을 JsonNode로 매핑
            JsonNode rootNode = objectMapper.readTree(jsonString);

            // response 아래의 필드를 Map에 담기
            rootNode.fields().forEachRemaining(entry -> {
                dataMap.put(entry.getKey(), entry.getValue().asText());
            });

        } catch (Exception e) {
            e.printStackTrace();
        }

        return dataMap;
    }


    public static String convertObjectToJson(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // response 필드를 따로 JSON 문자열로 변환
            if (object instanceof UserInfo) {
                UserInfo userInfo = (UserInfo) object;
                Object response = userInfo.getResponse();
                if (response != null) {
                    String responseJson = objectMapper.writeValueAsString(response);
                    // response를 JSON 문자열로 변환하여 Map에 추가
                    Map<String, Object> dataMap = objectMapper.readValue(responseJson, new TypeReference<Map<String, Object>>() {});
                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.putAll(dataMap);
                    resultMap.put("response", responseJson);
                    return objectMapper.writeValueAsString(resultMap);
                }
            }
            // 그 외의 경우는 전체 객체를 JSON으로 변환
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}