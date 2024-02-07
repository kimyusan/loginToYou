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
    private final ChallengeProgressRepository challengeProgressRepository;
    private final UserRepository userRepository;

    public ChallengeServiceImpl(ChallengeListRepository challengeListRepository,
                                ChallengeProgressRepository challengeRepository,
                                UserRepository userRepository) {
        this.challengeListRepository = challengeListRepository;
        this.challengeProgressRepository = challengeRepository;
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

        challengeProgressRepository.saveAll(list);
    }

    /**
     * 파라미터로 받은 유저의 챌린지 진행사항 불러오기
     */
    @Override
    public List<UserChallengeDto> getUserChallenges(int userId, String type) {

        List<UserChallengeDto> list = challengeProgressRepository.findUserChallenges(userId, type);

        return list;
    }

    /**
     * 파라미터에 해당하는 챌린지의 진행도를 증가시킴
     */
    @Override
    public void updateProgress(List<UserChallengeDto> list) {

        // 누적 챌린지만 증가 위해 리스트에서 연속인것 제거
        for(int i = list.size()-1; i >= 0; i--) {
            if(list.get(i).isContinuous()) {
                list.remove(i);
            }
        }
        
        // 파라미터로 받은 UserChallengeDto 리스트에서 challengeProgressId만 추출해 Integer List 만들기
        List<Integer> challengeProgressIds = list.stream()
                        .map(UserChallengeDto::getChallengeProgressId)
                        .toList();
        
        // challengeProgressId 리스트를 파라미터로 넘겨 진행도 증가시키기
        challengeProgressRepository.incrementProgressByChallengeProgressIds(challengeProgressIds);

        // goal과 isDone 확인 후 완료한 챌린지는 isDone을 true로 변경
        for(Integer challengeProgressId : challengeProgressIds) {
            challengeProgressRepository.updateIsDoneByChallengeProgressId(challengeProgressId);
        }
    }

}
