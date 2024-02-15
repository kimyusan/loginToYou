package com.ssafy.spyfamily.question.service;

import com.ssafy.spyfamily.question.model.CoupleTodayQuestion;
import com.ssafy.spyfamily.question.model.TodayQuestion;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public interface QuestionService {
    TodayQuestion getQuestion(Integer todayQuestionId);
    void saveQuestion(CoupleTodayQuestion coupleTodayQuestion);

    void updateQuestion(CoupleTodayQuestion coupleTodayQuestion);

    CoupleTodayQuestion getCoupleTodayQuestionById(Integer todayQuestionId, Integer userId);

    ArrayList<CoupleTodayQuestion> getQuestionAnswers(Integer coupleId);
}
