package com.ssafy.spyfamily.challenge.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping(value = "/challenge", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class ChallengeController {

    /**
     * 회원가입 시 회원마다 챌린지 DB에 추가시키기
     * @return
     */
    @PostMapping("/init")
    public ResponseEntity<?> createChallenge() {

        return null;
    }

}
