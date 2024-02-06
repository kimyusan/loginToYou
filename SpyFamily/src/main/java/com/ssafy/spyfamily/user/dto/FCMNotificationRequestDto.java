package com.ssafy.spyfamily.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FCMNotificationRequestDto {
    private Integer userId;
    private String title;
    private String body;
    // private String image;
    // private Map<String, String> data;

    @Builder
    public FCMNotificationRequestDto(Integer targetUserId, String title, String body) {
        this.userId = targetUserId;
        this.title = title;
        this.body = body;
        // this.image = image;
        // this.data = data;
    }
}