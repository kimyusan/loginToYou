package com.ssafy.spyfamily.challenge.service;


import com.ssafy.spyfamily.challenge.model.Challenge;
import com.ssafy.spyfamily.challenge.model.ChallengeList;

import java.util.List;

public interface ChallengeService {

    /**
     * 모든 챌린지 리스트 리턴
     */
    List<ChallengeList> getChallengeList();

    /**
     * 챌린지 저장
     */
    void saveChallenges(int userId, List<ChallengeList> challengeList);

}
