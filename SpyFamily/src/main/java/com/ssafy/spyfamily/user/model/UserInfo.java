package com.ssafy.spyfamily.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class UserInfo {

    @JsonProperty("sub")
    private String userId;

    @JsonProperty("email")
    private String email;

   @JsonProperty("name")
    private String name;

    @JsonProperty("nickname")
    private String nickname;

    @JsonProperty("error")
    private String error;

    @JsonProperty("picture")
    private String picture;

    @JsonProperty("response")
    private Object response;

    @JsonProperty("token_type")
    private String token_type;

    @JsonProperty("access_token")
    private String access_token;

    @JsonProperty("id_token")
    private String id_token;

    @JsonProperty("expires_in")
    private int expires_in;

    @JsonProperty("refresh_token")
    private String refresh_token;

    @JsonProperty("refresh_token_expires_in")
    private String refresh_token_expires_in;

}
