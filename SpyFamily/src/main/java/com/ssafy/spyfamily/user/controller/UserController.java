package com.ssafy.spyfamily.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.model.UserInfo;
import com.ssafy.spyfamily.user.service.UserServiceImpl;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    /**
     * @param userData key: email, password, name
     */
    @PostMapping("/user/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> userData) {

        User user = userService.signup(userData);

        System.out.println(user.getEmail());
        System.out.println(user.getPassword());
        System.out.println(user.getName());

        return null;
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userData) {

        return null;
    }

    @PostMapping("/login/oauth2/code/google")
    public ResponseEntity<UserInfo> googleLoginPost(@RequestParam String access_Token) {
        try {
            // Google API로부터 사용자 정보 얻기
            UserInfo userInfo = userService.getGoogleUserInfo(access_Token);

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
    public ResponseEntity<?> kakaoLoginPost(@RequestParam String code) throws JsonProcessingException {

        // Kakao API에 POST 요청
        ResponseEntity<UserInfo> responseEntity = userService.getKakaoPost(code);

        // HTTP 상태 코드 확인
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        System.out.println("HTTP Status Code: " + statusCode);


        if (statusCode == HttpStatus.OK) {
            UserInfo kakaoUser = responseEntity.getBody();

            System.out.println("Received KakaoUser:");
            System.out.println("Token Type: " + kakaoUser.getToken_type());
            System.out.println("Access Token: " + kakaoUser.getAccess_token());
            System.out.println("ID Token: " + kakaoUser.getId_token());
            System.out.println("Expires In: " + kakaoUser.getExpires_in());
            System.out.println("Refresh Token: " + kakaoUser.getRefresh_token());
            System.out.println("Refresh Token Expires In: " + kakaoUser.getRefresh_token_expires_in());


            String token = kakaoUser.getId_token();
            String[] check = token.split("\\.");
            Base64.Decoder decoder = Base64.getDecoder();
            String payload = new String(decoder.decode(check[1]));

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> returnMap = mapper.readValue(payload, Map.class);

            System.out.println();

            // UserInfo 객체에 담기
            UserInfo userInfo = new UserInfo();
            userInfo.setEmail((String) returnMap.get("email"));
            userInfo.setNickname((String) returnMap.get("nickname"));
            userInfo.setPicture((String) returnMap.get("picture"));

            System.out.println(userInfo.getNickname());
            System.out.println(userInfo.getEmail());
            System.out.println(userInfo.getPicture());

            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        } else {
            // 에러 처리 등을 수행
            System.out.println("Error response: " + responseEntity.getBody());
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 결과 반환
//        return responseEntity;
    }

    @RequestMapping(value = "/login/oauth2/code/naver")
    public ResponseEntity<?> naverLogin(@RequestParam String code, @RequestParam String state) {

        // naver API에 POST 요청
        ResponseEntity<UserInfo> responseEntity = userService.getNaverPost(code, state);

        // HTTP 상태 코드 확인
        HttpStatusCode statusCode = responseEntity.getStatusCode();
        System.out.println("HTTP Status Code: " + statusCode);

        if (statusCode == HttpStatus.OK) {
            UserInfo naverUser = responseEntity.getBody();

            System.out.println("Received Naver User:");
            System.out.println("Token Type: " + naverUser.getToken_type());
            System.out.println("Access Token: " + naverUser.getAccess_token());
            System.out.println("Expires In: " + naverUser.getExpires_in());
            System.out.println("Refresh Token: " + naverUser.getRefresh_token());


            UserInfo userInfo = userService.getNaverUserInfo(naverUser.getAccess_token());

            System.out.println("네이버 로그인");
            String jsonString = userService.convertObjectToJson(userInfo.getResponse());
            Map<String, String> dataMap = userService.convertJsonToMap(jsonString);

            for (Map.Entry<String, String> entry : dataMap.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }

            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        } else {
            // 에러 처리 등을 수행
            System.out.println("Error response: " + responseEntity.getBody());
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
