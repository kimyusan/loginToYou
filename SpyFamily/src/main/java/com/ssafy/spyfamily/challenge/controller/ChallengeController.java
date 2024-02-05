package com.ssafy.spyfamily.challenge.controller;

import com.ssafy.spyfamily.challenge.model.Challenge;
import com.ssafy.spyfamily.challenge.model.ChallengeList;
import com.ssafy.spyfamily.challenge.service.ChallengeService;
import com.ssafy.spyfamily.challenge.service.ChallengeServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
     * 회원가입 시 회원마다 챌린지 DB에 추가시키기
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

    @GetMapping("/get/challenges")
    public ResponseEntity<?> getUserChallenges(@RequestParam(name="userId") int userId) {

        challengeService.getUserChallenges(userId);

        return null;
    }

}
