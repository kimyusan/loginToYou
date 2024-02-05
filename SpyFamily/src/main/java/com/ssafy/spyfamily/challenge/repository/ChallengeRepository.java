package com.ssafy.spyfamily.challenge.repository;

import com.ssafy.spyfamily.challenge.model.Challenge;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

    @Transactional
    @Query("SELECT NEW com.ssafy.spyfamily.challenge.model.UserChallengeDto(" +
            "l.type, l.subject, l.content, l.goal, c.progress, c.isDone, u.userId) " +
            "FROM Challenge c " +
            "JOIN c.challengeList l " +
            "JOIN c.user u " +
            "WHERE u.userId = :userId")
    List<UserChallengeDto> findUserChallenges(@Param("userId") Integer userId);

}
