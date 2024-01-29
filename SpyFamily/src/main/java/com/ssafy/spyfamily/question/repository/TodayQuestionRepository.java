package com.ssafy.spyfamily.question.repository;

import com.ssafy.spyfamily.question.model.TodayQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TodayQuestionRepository extends JpaRepository<TodayQuestion, Integer> {

    @Query("SELECT question FROM TodayQuestion question WHERE question.todayQuestionId = :todayQuestionId")
    TodayQuestion getQuestionById(@Param("todayQuestionId") Integer todayQuestionId);

}
