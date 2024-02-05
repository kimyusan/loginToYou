package com.ssafy.spyfamily.challenge.service;


import com.ssafy.spyfamily.challenge.model.Challenge;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;

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

    /**
     * 파라미터로 받은 유저의 챌린지 진행사항 불러오기
     */
    List<UserChallengeDto> getUserChallenges(int userId);

}
