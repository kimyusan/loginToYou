package com.ssafy.spyfamily.user.service;

import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.model.UserInfo;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserService {

    /**
     * 파라미터로 받은 이메일이 DB에 존재하는지 여부 확인
     */
    boolean isDuplicateUserEmail(String email);

    /**
     * 입력받은 데이터를 바탕으로 회원가입 진행
     * key: email, password
     */
    User signup(Map<String, String> userData);

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
