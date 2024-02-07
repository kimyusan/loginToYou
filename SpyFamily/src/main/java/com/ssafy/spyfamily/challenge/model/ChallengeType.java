package com.ssafy.spyfamily.challenge.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChallengeType {
    @Id
    private Integer challengeTypeId;
    private String type;
}
