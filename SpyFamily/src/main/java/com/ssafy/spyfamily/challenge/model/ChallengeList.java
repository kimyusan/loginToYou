package com.ssafy.spyfamily.challenge.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChallengeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer challengeListId;
    private String subject;
    private String content;
    private boolean isContinuous;
    private Integer goal;

    @ManyToOne
    @JoinColumn(name="type")
    private ChallengeType challengeType;

}
