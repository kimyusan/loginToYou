package com.ssafy.spyfamily.challenge.service;

import com.ssafy.spyfamily.challenge.model.ChallengeProgress;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import com.ssafy.spyfamily.challenge.repository.ChallengeListRepository;
import com.ssafy.spyfamily.challenge.repository.ChallengeProgressRepository;
import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.repository.UserRepository;
import com.ssafy.spyfamily.util.ChallengeUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeListRepository challengeListRepository;
    private final ChallengeProgressRepository challengeProgressRepository;
    private final UserRepository userRepository;

    private final ChallengeUtil challengeUtil;

    public ChallengeServiceImpl(ChallengeListRepository challengeListRepository,
                                ChallengeProgressRepository challengeRepository,
                                UserRepository userRepository,
                                ChallengeUtil challengeUtil) {
        this.challengeListRepository = challengeListRepository;
        this.challengeProgressRepository = challengeRepository;
        this.userRepository = userRepository;
        this.challengeUtil = challengeUtil;
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
        User user = userRepository.findByUserId(userId);

        List<ChallengeProgress> cpList = challengeUtil.makeChallengeProgressList(user, challengeList);

        challengeProgressRepository.saveAll(cpList);
    }

    /**
     * 파라미터로 받은 유저의 챌린지 진행사항 불러오기
     */
    @Override
    public List<UserChallengeDto> getUserChallenges(int userId, String type) {

        List<UserChallengeDto> dtoList = challengeProgressRepository.findUserChallenges(userId, type);

        return dtoList;
    }

    /**
     * 파라미터에 해당하는 챌린지의 진행도를 증가시킴
     */
    @Override
    public void updateProgress(List<UserChallengeDto> list) {

        // 연속인 챌린지와 아닌 챌린지(누적) 나누기
        List<UserChallengeDto> continuousList = challengeUtil.getContinuousList(list);
        List<UserChallengeDto> nonContinuousList = challengeUtil.getNonContinuousList(list);

        // 누적인 챌린지 리스트에서 challengeProgressId만 추출해 Integer List 만들기
        List<Integer> challengeProgressIds = nonContinuousList.stream()
                        .map(UserChallengeDto::getChallengeProgressId)
                        .collect(Collectors.toList());

        // 연속인 챌린지 체크
        for (UserChallengeDto userChallengeDto : continuousList) {
            // 만약 연속이라면 Id 리스트에 추가
            if(challengeUtil.isContinuous(userChallengeDto.getPrevDate())) {
                challengeProgressIds.add(userChallengeDto.getChallengeProgressId());
            }
            // 아니라면 prevDate는 현재 날짜, progress는 1로 변경
            else {
                Optional<ChallengeProgress> optionalChallengeProgress = challengeProgressRepository.findById(userChallengeDto.getChallengeProgressId());
                if (optionalChallengeProgress.isPresent()) {
                    ChallengeProgress progress = optionalChallengeProgress.get();
                    progress.setProgress(1);
                    progress.setPrevDate(LocalDateTime.now());
                    challengeProgressRepository.save(progress);
                }
            }
        }

        // challengeProgressId 리스트를 파라미터로 넘겨 진행도 증가시키기(isDone이 true인건 증가 안함)
        challengeProgressRepository.incrementProgressByChallengeProgressIds(challengeProgressIds);

        // goal과 isDone 확인 후 완료한 챌린지는 isDone을 true로 변경
        for(Integer challengeProgressId : challengeProgressIds) {
            challengeProgressRepository.updateIsDoneByChallengeProgressId(challengeProgressId);
        }

    }

}
