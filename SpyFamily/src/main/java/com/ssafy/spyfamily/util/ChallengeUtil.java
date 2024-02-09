package com.ssafy.spyfamily.util;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.ChallengeProgress;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import com.ssafy.spyfamily.user.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.time.Duration;
import java.time.LocalDateTime;

@Component
public class ChallengeUtil {

    /**
     * isContinuous값의 true, false에 따라 해당 값만 가진 리스트 리턴
     */
    public List<UserChallengeDto> filterByContinuous(List<UserChallengeDto> dtos, boolean isContinuous) {
        List<UserChallengeDto> filteredList = new ArrayList<>();
        for (UserChallengeDto dto : dtos) {
            if (dto.isContinuous() == isContinuous) {
                filteredList.add(dto);
            }
        }
        return filteredList;
    }

    /**
     * isContinuous가 true인 리스트 리턴
     */
    public List<UserChallengeDto> getContinuousList(List<UserChallengeDto> dtos) {
        return filterByContinuous(dtos, true);
    }

    /**
     * isContinuous가 false인 리스트 리턴
     */
    public List<UserChallengeDto> getNonContinuousList(List<UserChallengeDto> dtos) {
        return filterByContinuous(dtos, false);
    }

    /**
     * User, ChallengeList를 통해 ChallengeProgress List를 만들어 리턴
     */
    public List<ChallengeProgress> makeChallengeProgressList(User user, List<ChallengeList> clList) {
        List<ChallengeProgress> cpList = new ArrayList<ChallengeProgress>();

        ChallengeProgress challengeProgress;

        for(ChallengeList cl : clList) {
            challengeProgress = new ChallengeProgress();
            challengeProgress.setChallengeList(cl);
            challengeProgress.setUser(user);
            challengeProgress.setProgress(0);
            challengeProgress.setDone(false);
            challengeProgress.setPrevDate(LocalDateTime.now());
            cpList.add(challengeProgress);
        }

        return cpList;
    }

    /**
     * 저장된 날짜와 현재 날짜가 며칠 차이나는지 리턴
     */
    public long getDiffPrevDate(LocalDateTime timestamp) {
        LocalDateTime current = LocalDateTime.now();

        return Duration.between(timestamp, current).toDays();
    }

}
