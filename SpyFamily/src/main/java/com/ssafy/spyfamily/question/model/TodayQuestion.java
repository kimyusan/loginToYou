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
public class TodayQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer todayQuestionId;
    private String question;

}
