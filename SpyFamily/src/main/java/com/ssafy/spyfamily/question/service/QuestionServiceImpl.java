package com.ssafy.spyfamily.question.service;


import com.ssafy.spyfamily.question.repository.CoupleTodayQuestionRepository;
import com.ssafy.spyfamily.question.repository.TodayQuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService{

    private CoupleTodayQuestionRepository coupleTodayQuestionRepository;
    private TodayQuestionRepository todayQuestionRepository;



}
