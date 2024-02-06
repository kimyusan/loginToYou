package com.ssafy.spyfamily.challenge.service;

import com.ssafy.spyfamily.challenge.model.Challenge;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import com.ssafy.spyfamily.challenge.repository.ChallengeListRepository;
import com.ssafy.spyfamily.challenge.repository.ChallengeRepository;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeListRepository challengeListRepository;
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    public ChallengeServiceImpl(ChallengeListRepository challengeListRepository,
                                ChallengeRepository challengeRepository,
                                UserRepository userRepository) {
        this.challengeListRepository = challengeListRepository;
        this.challengeRepository = challengeRepository;
        this.userRepository = userRepository;
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
        User user = userRepository.findByUserId(userId);
        Challenge challenge;
        for(ChallengeList chList : challengeList) {
            challenge = new Challenge();
            challenge.setChallengeList(chList);
            challenge.setUser(user);
            challenge.setProgress(0);
            challenge.setDone(false);
            list.add(challenge);
        }

        challengeRepository.saveAll(list);
    }

    /**
     * 파라미터로 받은 유저의 챌린지 진행사항 불러오기
     */
    @Override
    public List<UserChallengeDto> getUserChallenges(int userId) {

        List<UserChallengeDto> list = challengeRepository.findUserChallenges(userId);

        return list;
    }

}
