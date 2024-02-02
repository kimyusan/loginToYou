package com.ssafy.spyfamily.user.service;

import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.model.UserInfo;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserService {

    /**
     * 파라미터로 받은 이메일이 존재하면 User리턴, 없으면 null 리턴
     */
    User getUserByEmail(String email);

    /**
     * 유저정보 수정
     */
    User userUpdate(User user);

    void save(User user);
    /**
     * 입력받은 데이터를 바탕으로 회원가입 진행
     * key: email, password, name
     */
    User signup(Map<String, String> userData);

    /**
     * 일반 로그인
     * key: email, password
     */
    User login(Map<String, String> loginData);

    void withdrawal(Integer userId);

    User userUpdatePassword(Integer userId, String password);
    User findByUserId(int userId);
    /**
     * 구글 로그인 
     */
    UserInfo getGoogleUserInfo(String accessToken);

    /**
     * 네이버 로그인
     */
    UserInfo getNaverUserInfo(String accessToken);

    /**
     * 카카오 로그인
     */
    ResponseEntity<UserInfo> getKakaoPost(String code);

}
