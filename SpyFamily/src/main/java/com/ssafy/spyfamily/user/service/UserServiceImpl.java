package com.ssafy.spyfamily.user.service;

import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.model.UserInfo;
import com.ssafy.spyfamily.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Value("${naver.clientId}")
    private String naverClientId;

    @Value("${naver.clientSecret}")
    private String naverClientSecret;

    @Value("${kakao.clientId}")
    private String kakaoClientId;

    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(RestTemplate restTemplate, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.restTemplate = restTemplate;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }



    @Override
    public User getUserByEmail(String email) {
        log.info(email);
        int count = userRepository.countByEmail(email);
        log.info(count + "조회수 ");
        // 정보를 찾으려는 이메일로 가입된 회원정보가 없는 경우
        if(count != 0) {
            return userRepository.findByEmail(email);
        }

        return null;
    }

    @Override
    public User userUpdate(User user) {

        User new_user = userRepository.findByUserId(user.getUserId());

        // mobile 있다면
        if (user.getMobile() != null) {
            new_user.setMobile(user.getMobile());
        }

        // 생일을 입력받았다면
        if (user.getBirthday() != null) {
            new_user.setBirthday(user.getBirthday());
        }

        // 닉네임을 입력했다면
        if (user.getNickname() != null) {
            new_user.setNickname(user.getNickname());
        }

        // 성별을 설정했다면
        if (user.getGender() != null) {
            new_user.setGender(user.getGender());
        }

        return userRepository.save(new_user);
    }

    @Override
    public void save(User user) {
         userRepository.save(user);
    }


    @Override
    public User signup(Map<String, String> userData) {

        User user = getUserByEmail(userData.get("email"));

        // 회원가입 하려는 아이디가 유일한 경우(존재하지 않는 경우)에만 회원가입 진행
        if(user == null) {
            String encodedPassword = userData.get("password");
            encodedPassword = passwordEncoder.encode(encodedPassword);

            user = new User();
            user.setEmail(userData.get("email"));
            user.setPassword(encodedPassword);
            user.setName(userData.get("name"));

            return userRepository.save(user);
        }

        return null;
    }

    @Override
    public User login(Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // DB에 저장된 유저 정보
        User user = getUserByEmail(email);

        // DB에 있는 비밀번호와 사용자가 입력한 비밀번호 비교
        if(user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }

        return null;
    }

    @Override
    public void withdrawal(Integer userId) {
        userRepository.deleteByUserId(userId);
    }

    @Override
    public User userUpdatePassword(Integer userId, String password) {

        System.out.println("비밀번호 수정");
        User new_user = userRepository.findByUserId(userId);
        new_user.setPassword(passwordEncoder.encode(password));

        System.out.println(new_user.toString());

        return userRepository.save(new_user);
    }

    @Override
    public User findByUserId(int userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
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

    @Override
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

    @Override
    public ResponseEntity<UserInfo> getKakaoPost(String code) {
        // Kakao API 요청을 위한 정보
        String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
        String grantType = "authorization_code";
        String clientId = kakaoClientId;
        String redirectUri = "https://logintoyou.kro.kr:8443/middle/login";

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
        String clientId = naverClientId;
        String Client_Secret = naverClientSecret;

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

}