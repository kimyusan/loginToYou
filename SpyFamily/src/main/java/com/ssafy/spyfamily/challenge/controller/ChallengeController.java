package com.ssafy.spyfamily.challenge.controller;

import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.model.UserChallengeDto;
import com.ssafy.spyfamily.challenge.service.ChallengeService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(value = "/challenge", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    /**
     * 회원가입 시 회원마다 challenge_progress DB에 추가시키기
     * @param userId 챌린지를 추가할 userId
     */
    @PostMapping("/init")
    public ResponseEntity<?> createChallenge(@RequestParam(name="userId") int userId) {

        // 모든 챌린지 리스트 불러오기
        List<ChallengeList> list = challengeService.getChallengeList();
        // 입력받은 유저에게 챌린지 추가하기
        challengeService.saveChallenges(userId, list);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    /**
     * userId에 해당하는 챌린지 목록 및 각각의 진행사항을 리턴
     * @param userId 챌린지 목록 가져올 유저의 id
     */
    @GetMapping("/get/challenges")
    public ResponseEntity<?> getUserChallenges(@RequestParam(name="userId") int userId) {

        List<UserChallengeDto> list = challengeService.getUserChallenges(userId, null);

        return new ResponseEntity<List<UserChallengeDto>>(list, HttpStatus.OK);
    }

    /**
     * 유저의 챌린지 진행사항 증가시키기
     */
    @PostMapping("/add/progress")
    public ResponseEntity<?> updateProgress(@RequestParam int userId, @RequestParam String type) {

        // 해당 유저가 한 행동에 해당하는 챌린지 목록 가져오기
        List<UserChallengeDto> list = challengeService.getUserChallenges(userId, type);

        // 해당 챌린지의 진행도 증가(progress)
        challengeService.updateProgress(list);

        return new ResponseEntity<List<UserChallengeDto>>(list, HttpStatus.OK);
    }

    /**
     * 유저 챌린지 진행사항 설정
     */
    @PostMapping("/set/progress")
    public ResponseEntity<?> setProgress(@RequestParam int userId,
                                         @RequestParam String type,
                                         @RequestParam int progress) {

        // 해당 유저가 한 행동에 해당하는 챌린지 목록 가져오기
        List<UserChallengeDto> list = challengeService.getUserChallenges(userId, type);

        challengeService.setProgress(list, progress);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }


}
