package com.ssafy.spyfamily.challenge.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChallengeDto {

    private String type;
    private String subject;
    private String content;
    private Integer goal;
    private Integer progress;
    private boolean isDone;
    private Integer userId;

    public UserChallengeDto() { }

    public UserChallengeDto(String type, String subject, String content, int goal, int progress, boolean isDone, int userId) {
        this.type = type;
        this.subject = subject;
        this.content = content;
        this.goal = goal;
        this.progress = progress;
        this.isDone = isDone;
        this.userId = userId;
    }
}
