package com.ssafy.spyfamily.question.repository;

import com.ssafy.spyfamily.question.model.CoupleTodayQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;


public interface CoupleTodayQuestionRepository extends JpaRepository<CoupleTodayQuestion, Integer> {

    CoupleTodayQuestion findByTodayQuestionIdAndUserId(Integer todayQuestionId, Integer userId);

    ArrayList<CoupleTodayQuestion> findByCoupleId(Integer coupleId);

}
