package com.ssafy.spyfamily.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Object getResponse() {
        return response;
    }

    public void setResponse(Object response) {
        this.response = response;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getId_token() {
        return id_token;
    }

    public void setId_token(String id_token) {
        this.id_token = id_token;
    }

    public int getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(int expires_in) {
        this.expires_in = expires_in;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public String getRefresh_token_expires_in() {
        return refresh_token_expires_in;
    }

    public void setRefresh_token_expires_in(String refresh_token_expires_in) {
        this.refresh_token_expires_in = refresh_token_expires_in;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userId='" + userId + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", error='" + error + '\'' +
                ", picture='" + picture + '\'' +
                ", response=" + response +
                ", token_type='" + token_type + '\'' +
                ", access_token='" + access_token + '\'' +
                ", id_token='" + id_token + '\'' +
                ", expires_in=" + expires_in +
                ", refresh_token='" + refresh_token + '\'' +
                ", refresh_token_expires_in='" + refresh_token_expires_in + '\'' +
                '}';
    }
}
