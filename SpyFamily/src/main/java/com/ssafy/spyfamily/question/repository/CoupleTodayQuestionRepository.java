package com.ssafy.spyfamily.question.repository;

import com.ssafy.spyfamily.question.model.CoupleTodayQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


@Repository
public interface CoupleTodayQuestionRepository extends JpaRepository<CoupleTodayQuestion, Integer> {

    CoupleTodayQuestion findByTodayQuestionIdAndUserId(Integer todayQuestionId, Integer userId);

    ArrayList<CoupleTodayQuestion> findByCoupleId(Integer coupleId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CoupleTodayQuestion c WHERE c.coupleId = :coupleId")
    void deleteByCoupleId(Integer coupleId);


}
