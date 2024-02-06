package com.ssafy.spyfamily.challenge.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChallengeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int challengeListId;
    private String subject;
    private String content;
    private int goal;
    private String type;


}
