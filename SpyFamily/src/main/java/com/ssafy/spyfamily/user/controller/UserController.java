package com.ssafy.spyfamily.user.controller;

import com.ssafy.spyfamily.user.model.KakaoUser;
import com.ssafy.spyfamily.user.model.UserInfo;
import com.ssafy.spyfamily.user.service.GoogleApiService;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
public class UserController {

    private final GoogleApiService googleApiService;

    public UserController(GoogleApiService googleApiService) {
        this.googleApiService = googleApiService;
    }

    @PostMapping("/login/oauth2/code/google")
    public ResponseEntity<UserInfo> googleLoginPost(@RequestParam(name = "accessToken") String accessToken) {
        try {
            // Google API로부터 사용자 정보 얻기
            UserInfo userInfo = googleApiService.getUserInfo(accessToken);

            // 사용자 정보 출력 예시
            System.out.println("User ID: " + userInfo.getUserId());
            System.out.println("Email: " + userInfo.getEmail());
            System.out.println("Name: " + userInfo.getName());

            return new ResponseEntity<>(userInfo, HttpStatus.OK);

        } catch (Exception e) {
            // 오류 처리
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/oauth2/code/kakao")
    public ResponseEntity<?> kakaoLoginPost(@RequestParam(name = "accessToken") String accessToken) {
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
        params.add("code", accessToken);

        // 요청 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // Kakao API에 POST 요청
        ResponseEntity<KakaoUser> responseEntity = new RestTemplate().postForEntity(kakaoTokenUrl, request, KakaoUser.class);

        // HTTP 상태 코드 확인
        HttpStatus statusCode = (HttpStatus) responseEntity.getStatusCode();
        System.out.println("HTTP Status Code: " + statusCode);

        if (statusCode == HttpStatus.OK) {
            KakaoUser kakaoUser = responseEntity.getBody();

            System.out.println("Received KakaoUser:");
            System.out.println("Token Type: " + kakaoUser.getToken_type());
            System.out.println("Access Token: " + kakaoUser.getAccess_token());
            System.out.println("ID Token: " + kakaoUser.getId_token());
            System.out.println("Expires In: " + kakaoUser.getExpires_in());
            System.out.println("Refresh Token: " + kakaoUser.getRefresh_token());
            System.out.println("Refresh Token Expires In: " + kakaoUser.getRefresh_token_expires_in());

//            // JWT 해석
//            Jws<Claims> claimsJws = Jwts.parser().setSigningKey("your-signing-key").parseClaimsJws(kakaoUser.getId_token());
//            Claims claims = claimsJws.getBody();
//
//            // JWT에서 필요한 정보 추출
//            String email = claims.get("email", String.class);
//            String nickname = claims.get("nickname", String.class);
//            String picture = claims.get("picture", String.class);
//
//            System.out.println();

            // UserInfo 객체에 담기
//            UserInfo userInfo = new UserInfo();
//            userInfo.setEmail(email);
//            userInfo.setNickname(nickname);
//            userInfo.setPicture(picture);

//            return new ResponseEntity<>(userInfo, HttpStatus.OK);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } else {
            // 에러 처리 등을 수행
            System.out.println("Error response: " + responseEntity.getBody());
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 결과 반환
//        return responseEntity;
    }

}
