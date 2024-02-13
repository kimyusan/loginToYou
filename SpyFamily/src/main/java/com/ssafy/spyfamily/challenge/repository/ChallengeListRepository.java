package com.ssafy.spyfamily.challenge.repository;

import com.ssafy.spyfamily.challenge.model.ChallengeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeListRepository extends JpaRepository<ChallengeList, Integer> {

    /**
     * 모든 챌린지 리스트 가져오기
     */
    @Query("SELECT c FROM ChallengeList c")
    List<ChallengeList> findAllChallengeLists();
}
