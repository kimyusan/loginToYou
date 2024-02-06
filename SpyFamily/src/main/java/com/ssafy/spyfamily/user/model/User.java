package com.ssafy.spyfamily.user.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
public class User {
    @Id
    private int userId;
    private String email; // login id
    private String name;
    private String mobile;
    private String birthday;

    private String gender;
    private Integer coupleId;
    private String nickname;
    private String password;
    private String role;

    private String refreshToken;
    private Boolean isPushOk ;
    private String fcmToken;
}
