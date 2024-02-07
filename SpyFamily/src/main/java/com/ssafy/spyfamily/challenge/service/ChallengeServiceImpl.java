package com.ssafy.spyfamily.challenge.service;

import com.ssafy.spyfamily.challenge.model.ChallengeProgress;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import com.ssafy.spyfamily.challenge.repository.ChallengeListRepository;
import com.ssafy.spyfamily.challenge.repository.ChallengeProgressRepository;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeListRepository challengeListRepository;
    private final ChallengeProgressRepository challengeRepository;
    private final UserRepository userRepository;

    public ChallengeServiceImpl(ChallengeListRepository challengeListRepository,
                                ChallengeProgressRepository challengeRepository,
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

        List<ChallengeProgress> list = new ArrayList<ChallengeProgress>();
        User user = userRepository.findByUserId(userId);
        ChallengeProgress challengeProgress;
        for(ChallengeList cl : challengeList) {
            challengeProgress = new ChallengeProgress();
            challengeProgress.setChallengeList(cl);
            challengeProgress.setUser(user);
            challengeProgress.setProgress(0);
            challengeProgress.setDone(false);
            challengeProgress.setPrevDate(null);
            list.add(challengeProgress);
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
