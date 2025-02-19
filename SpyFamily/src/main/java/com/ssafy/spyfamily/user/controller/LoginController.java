package com.ssafy.spyfamily.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.model.UserInfo;
import com.ssafy.spyfamily.user.service.UserServiceImpl;
import com.ssafy.spyfamily.util.JWTUtil;
import com.ssafy.spyfamily.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@Slf4j
@RestController()
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class LoginController {

    private final UserServiceImpl userService;
    private final JsonUtil jsonUtil;
    private final JWTUtil jwtUtil;

    public LoginController(UserServiceImpl userService, JsonUtil jsonUtil,JWTUtil jwtUtil) {
        this.userService = userService;
        this.jsonUtil = jsonUtil;
        this.jwtUtil = jwtUtil;
    }

    /**
     * 일반 회원가입
     * @param userData key: email, password, name
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> userData) {

        User user = userService.signup(userData);

        if(user != null) {
            return new ResponseEntity<Integer>(user.getUserId(), HttpStatus.OK);
        }

        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    //ref토큰 재발급
    @PostMapping("/reissue/token")
    public ResponseEntity<?> reissueToken( @RequestHeader("refreshToken") String refreshToken,  @RequestParam String email){

        log.info("/reissue/token controller 실행");
        String refToken = refreshToken.substring(7);

        log.info(" refreshtoken : " + refreshToken) ;
        log.info("refToken : " + refToken);
        log.info("email : " + email);

        //ref토큰 기간만료 X  토큰 유저네임이 email 과 같다면
        if( !jwtUtil.isExpired(refToken) ||   email.equals(jwtUtil.getUsername(refToken))) {
//                email.equals(jwtUtil.getUsername(accessToken)) || jwtUtil.isExpired(accessToken)

            User user = userService.getUserByEmail(email);
            log.info(user.toString());
            //토큰 재발급
            String newAccessToken = jwtUtil.createJwt(user.getEmail(),user.getRole(),user.getUserId(),user.getCoupleId(),user.getName());
            String newRefreshToken = jwtUtil.createRefreshToken(email);
            user.setRefreshToken(newRefreshToken);

            //ref토큰
            userService.save(user);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Authorization", "Bearer " + newAccessToken);
            httpHeaders.add("refreshToken","Bearer " + newRefreshToken);


            return ResponseEntity.ok().headers(httpHeaders).body("재발급성공");
        }
        // 다시 로그인 하세요 요청 보내주면 좋을듯?
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    /**
     * 구글 로그인
     */
    @PostMapping("/login/google")

    public ResponseEntity<User> googleLoginPost(@RequestParam(name="access_Token") String access_Token) {
        try {
            // Google API로부터 사용자 정보 얻기
            UserInfo googleUser = userService.getGoogleUserInfo(access_Token);

            // 해당 유저가 가입했는지 확인하기
            String email = googleUser.getEmail();
            User user = userService.getUserByEmail(email);

            //log.info(user.toString());
            // 사용자 정보가 있다면 해당 유저 정보 리턴해주기
            log.info("구글로그인 시작");
            if(user != null) {

                String token = jwtUtil.createJwt(user.getEmail(), user.getRole(), user.getUserId(),user.getCoupleId(),user.getName());
                String refreshToken = jwtUtil.createRefreshToken(user.getEmail());

                log.info("token 생성 완료" + token);
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Authorization", "Bearer " + token);
                httpHeaders.add("refreshToken" , "Bearer " + refreshToken);
                user.setRefreshToken(refreshToken);

                userService.save(user);
                log.info("http헤더" + httpHeaders);

                return ResponseEntity.ok().headers(httpHeaders).body(user);
             //   return new ResponseEntity<User>(user, httpHeaders, HttpStatus.OK);
            }



            // 사용자 정보가 없다면 회원가입 페이지로 유도하기
            user = new User();
            user.setEmail(email);
            user.setName(googleUser.getName());

            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        // 오류 처리
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 카카오 로그인
     */
    @PostMapping("/login/kakao")
    public ResponseEntity<?> kakaoLoginPost(@RequestParam(name="code") String code) throws JsonProcessingException {
//        log.info("kakao login");

        // Kakao API에 POST 요청
        ResponseEntity<UserInfo> responseEntity = userService.getKakaoPost(code);

        // HTTP 상태 코드 확인
        HttpStatusCode statusCode = responseEntity.getStatusCode();

        // 정상적으로 카카오 유저 정보 받아온 경우
        if (statusCode == HttpStatus.OK) {
            UserInfo kakaoUser = responseEntity.getBody();

            // JWT 토큰에서 payload 구하기
            String token = kakaoUser.getId_token();
            String[] check = token.split("\\.");
            Base64.Decoder decoder = Base64.getDecoder();
            String payload = new String(decoder.decode(check[1]));

            // payload를 Map자료형으로 만들기
            Map<String, String> userData = jsonUtil.convertJsonToMap(payload);

            // 해당 유저가 가입했는지 확인하기
            String email = userData.get("email");
            User user = userService.getUserByEmail(email);
            // 사용자 정보가 있다면 해당 유저 정보 리턴해주기



            if(user != null) {
                String jwtToken = jwtUtil.createJwt(user.getEmail(), user.getRole(), user.getUserId(),user.getCoupleId(),user.getName());
                String refreshToken = jwtUtil.createRefreshToken(user.getEmail());
                log.info("token 생성 완료" + jwtToken);
                HttpHeaders httpHeaders = new HttpHeaders();

                httpHeaders.add("refreshToken" , "Bearer " + refreshToken);
                httpHeaders.add("Authorization", "Bearer " + jwtToken);
                user.setRefreshToken(refreshToken);

                userService.save(user);
                log.info("http헤더" + httpHeaders.toString());
                // response.addHeader("Authorization", "Bearer " + token);

                return ResponseEntity.ok().headers(httpHeaders).body(user);

            }

            // 사용자 정보가 없다면 회원가입 페이지로 유도하기
            user = new User();
            user.setEmail(email);
            user.setName(userData.get("nickname"));
            return new ResponseEntity<User>(user, HttpStatus.OK);


        } else {
            // 에러 처리 등을 수행
            log.info("Error response: " + responseEntity.getBody());
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 네이버 로그인
     */
    @RequestMapping(value = "/login/naver")

    public ResponseEntity<?> naverLogin(@RequestParam(name="code") String code, @RequestParam(name="state") String state) {

        // naver API에 POST 요청
        ResponseEntity<UserInfo> responseEntity = userService.getNaverPost(code, state);

        // HTTP 상태 코드 확인
        HttpStatusCode statusCode = responseEntity.getStatusCode();

        if (statusCode == HttpStatus.OK) {

            UserInfo userInfo = userService.getNaverUserInfo(responseEntity.getBody().getAccess_token());
            String jsonString = jsonUtil.convertObjectToJson(userInfo.getResponse());
            Map<String, String> userData = jsonUtil.convertJsonToMap(jsonString);

            // 해당 유저가 가입했는지 확인하기
            String email = userData.get("email");
            User user = userService.getUserByEmail(email);
            // 사용자 정보가 있다면 해당 유저 정보 토큰 담아서 리턴해주기
            if(user != null) {
                String jwtToken = jwtUtil.createJwt(user.getEmail(), user.getRole(), user.getUserId(),user.getCoupleId(),user.getName());
                String refreshToken = jwtUtil.createRefreshToken(user.getEmail());
                log.info("token 생성 완료" + jwtToken);
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Authorization", "Bearer " + jwtToken);
                httpHeaders.add("refreshToken", "Bearer "+ refreshToken);
                log.info("http헤더" + httpHeaders.toString());
                // response.addHeader("Authorization", "Bearer " + token);
                user.setRefreshToken(refreshToken);

                userService.save(user);
                return ResponseEntity.ok().headers(httpHeaders).body(user);

            }

            // 사용자 정보가 없다면 회원가입 페이지로 유도하기
            user = new User();
            user.setEmail(email);
            user.setName(userData.get("name"));
            log.info(user.toString());

            return new ResponseEntity<User>(user, HttpStatus.OK);

        } else {
            // 에러 처리 등을 수행
            log.info("Error response: " + responseEntity.getBody());
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
