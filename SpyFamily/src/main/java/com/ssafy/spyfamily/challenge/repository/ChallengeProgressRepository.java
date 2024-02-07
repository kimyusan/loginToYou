package com.ssafy.spyfamily.challenge.repository;

import com.ssafy.spyfamily.challenge.model.ChallengeProgress;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Integer> {

    @Transactional
    @Query("SELECT NEW com.ssafy.spyfamily.challenge.model.UserChallengeDto(" +
            "ct.type, cl.subject, cl.content, cl.isContinuous, cl.goal, cp.progress, cp.prevDate, cp.user.userId, cp.isDone) " +
            "FROM ChallengeProgress cp " +
            "JOIN cp.challengeList cl " +
            "JOIN cl.challengeType ct " +
            "WHERE cp.user.userId = :userId")
    List<UserChallengeDto> findUserChallenges(@Param("userId") Integer userId);

}
