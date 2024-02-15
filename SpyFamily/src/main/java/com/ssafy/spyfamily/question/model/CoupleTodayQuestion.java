package com.ssafy.spyfamily.question.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
public class CoupleTodayQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer coupleTodayQuestionId;
    private Integer coupleId;
    private Integer userId;
    private Integer todayQuestionId;
    private String userAnswer;
    private String registerDate;

}
