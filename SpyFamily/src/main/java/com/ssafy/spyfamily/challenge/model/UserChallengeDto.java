package com.ssafy.spyfamily.challenge.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserChallengeDto {

    private int challengeTypeId;
    private int challengeListId;
    private int challengeProgressId;

    private String type;
    private String subject;
    private String content;
    private boolean isContinuous;
    private Integer goal;
    private Integer progress;
    private String prevDate;
    private Integer userId;
    private boolean isDone;

}
