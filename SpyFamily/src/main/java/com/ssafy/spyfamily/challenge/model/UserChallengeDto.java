package com.ssafy.spyfamily.challenge.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserChallengeDto {

    private String type;
    private String subject;
    private String content;
    private Integer goal;
    private Integer progress;
    private boolean isDone;
    private String userId;

}
