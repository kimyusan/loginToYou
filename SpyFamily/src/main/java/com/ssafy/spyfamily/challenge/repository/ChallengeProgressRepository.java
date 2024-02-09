package com.ssafy.spyfamily.challenge.repository;

import com.ssafy.spyfamily.challenge.model.ChallengeProgress;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Integer> {

    /**
     * Id값으로 객체 리턴
     */
    Optional<ChallengeProgress> findById(Integer challengeProgressId);

    /**
     * userId에 해당하는 UserChallengeDto 리스트를 반환
     * type이 null이 아닐 경우 type도 같이 체크
     */
    @Query("SELECT NEW com.ssafy.spyfamily.challenge.model.UserChallengeDto(" +
            "ct.challengeTypeId, cl.challengeListId, cp.challengeProgressId, ct.type, cl.subject, cl.content, cl.isContinuous, cl.goal, cp.progress, cp.prevDate, cp.user.userId, cp.isDone) " +
            "FROM ChallengeProgress cp " +
            "JOIN cp.challengeList cl " +
            "JOIN cl.challengeType ct " +
            "WHERE (:type is null or ct.type = :type) " +
            "AND cp.user.userId = :userId")
    @Transactional
    List<UserChallengeDto> findUserChallenges(@Param("userId") Integer userId,
                                              @Param("type") String type);


    /**
     * challengeProgressId에 해당하는 progress를 1 증가시킨다.
     */
    @Modifying
    @Query("UPDATE ChallengeProgress cp " +
            "SET cp.progress = cp.progress + 1 " +
            "WHERE cp.isDone = false " +
            "AND cp.challengeProgressId IN :challengeProgressIds")
    @Transactional
    void incrementProgressByChallengeProgressIds(@Param("challengeProgressIds") List<Integer> challengeProgressIds);

    /**
     * challengeProgressId에 해당하는 progress와 goal을 확인해 챌린지를 달성했다면 isDone을 true로 바꿔준다.
     */
    @Modifying
    @Query("UPDATE ChallengeProgress cp " +
            "SET cp.isDone = true " +
            "WHERE cp.challengeProgressId = :challengeProgressId " +
            "AND cp.progress = (SELECT cl.goal " +
                                "FROM ChallengeList cl " +
                                "WHERE cl.challengeListId = cp.challengeList.challengeListId)")
    @Transactional
    void updateIsDoneByChallengeProgressId(@Param("challengeProgressId") Integer challengeProgressId);

}
