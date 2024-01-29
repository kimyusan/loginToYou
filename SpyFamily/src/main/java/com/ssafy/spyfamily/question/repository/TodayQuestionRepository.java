package com.ssafy.spyfamily.question.repository;

import com.ssafy.spyfamily.question.model.TodayQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodayQuestionRepository extends JpaRepository<TodayQuestion, Integer> {


}
