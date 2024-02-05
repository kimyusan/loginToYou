package com.ssafy.spyfamily.challenge.service;

import com.ssafy.spyfamily.challenge.model.Challenge;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import com.ssafy.spyfamily.challenge.repository.ChallengeListRepository;
import com.ssafy.spyfamily.challenge.repository.ChallengeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeListRepository challengeListRepository;
    private final ChallengeRepository challengeRepository;

    public ChallengeServiceImpl(ChallengeListRepository challengeListRepository,
                                ChallengeRepository challengeRepository) {
        this.challengeListRepository = challengeListRepository;
        this.challengeRepository = challengeRepository;
    }

    /**
     * 모든 챌린지 리스트 리턴
     */
    @Override
    public List<ChallengeList> getChallengeList() {
        return challengeListRepository.findAllChallengeLists();
    }

    /**
     * 챌린지 저장
     */
    @Override
    public void saveChallenges(int userId, List<ChallengeList> challengeList) {

        List<Challenge> list = new ArrayList<Challenge>();
        Challenge challenge;
        for(ChallengeList chList : challengeList) {
            challenge = new Challenge();
            challenge.setChallengeListId(chList.getChallengeListId());
            challenge.setUserId(userId);
            challenge.setProgress(0);
            challenge.setDone(false);
            list.add(challenge);
        }

        challengeRepository.saveAll(list);
    }

    @Override
    public List<UserChallengeDto> getUserChallenges(int userId) {

        List<UserChallengeDto> list = challengeRepository.findUserChallenges(userId);

        System.out.println(list.toString());

        return null;
    }

}
