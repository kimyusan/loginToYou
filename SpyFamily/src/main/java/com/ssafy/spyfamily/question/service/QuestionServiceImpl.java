package com.ssafy.spyfamily.question.service;


import com.ssafy.spyfamily.question.model.CoupleTodayQuestion;
import com.ssafy.spyfamily.question.model.TodayQuestion;
import com.ssafy.spyfamily.question.repository.CoupleTodayQuestionRepository;
import com.ssafy.spyfamily.question.repository.TodayQuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService{

    private final CoupleTodayQuestionRepository coupleTodayQuestionRepository;
    private final TodayQuestionRepository todayQuestionRepository;

    public QuestionServiceImpl(CoupleTodayQuestionRepository coupleTodayQuestionRepository,
                               TodayQuestionRepository todayQuestionRepository) {
        this.coupleTodayQuestionRepository = coupleTodayQuestionRepository;
        this.todayQuestionRepository = todayQuestionRepository;
    }

    @Override
    public TodayQuestion  getQuestion(Integer todayQuestionId) {
        return todayQuestionRepository.getQuestionById(todayQuestionId);
    }

    @Override
    public void saveQuestion(CoupleTodayQuestion coupleTodayQuestion) {
        coupleTodayQuestionRepository.save(coupleTodayQuestion);
    }

    @Override
    public void updateQuestion(CoupleTodayQuestion coupleTodayQuestion) {
        coupleTodayQuestionRepository.save(coupleTodayQuestion);
    }

//    @Override
    public CoupleTodayQuestion getCoupleTodayQuestionById(Integer todayQuestionId, Integer userId) {
        return coupleTodayQuestionRepository.findByTodayQuestionIdAndUserId(todayQuestionId, userId);
    }

}
