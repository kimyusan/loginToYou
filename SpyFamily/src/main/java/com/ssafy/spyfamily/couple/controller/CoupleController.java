package com.ssafy.spyfamily.couple.controller;

import com.ssafy.spyfamily.couple.model.Couple;
import com.ssafy.spyfamily.couple.service.CoupleServiceImpl;
import com.ssafy.spyfamily.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Request;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@Slf4j
@RestController()
@RequestMapping(value = "/couple", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class CoupleController {

    private final CoupleServiceImpl coupleService;

    public CoupleController(CoupleServiceImpl coupleService) {
        this.coupleService = coupleService;
    }


    // 초기 커플 생성


    @RequestMapping(value = "/create/couple/{emailA}/{emailB}")
    public ResponseEntity<?> createCouple(@RequestParam String emailA, @RequestParam String emailB , @RequestHeader HttpHeaders headers) {
        log.info(headers.get("Authorization").toString());
        log.info(headers.toString());

        log.info(emailA + " " + emailB);
        log.info("create 시작");

        try {
            log.info("커플방 생성");
            return ResponseEntity.ok(coupleService.coupleCteate(emailA, emailB));
        } catch (Exception e) {
            e.printStackTrace();
            log.info("커플방 생성 오류");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);


        }
    }
    // 커플정보 불러오기
    @GetMapping("/main")
    public ResponseEntity<?> getCoupleInfo(@RequestParam Integer coupleId) {
        try {
            ArrayList<Object> list = coupleService.mainCoupleInfo(coupleId);
            log.info("커플정보 불러오기 성공");
            return new ResponseEntity<ArrayList<Object>>(list, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("커플정보 불러오기 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // 커플정보 업데이트
    @PutMapping("/update")
    public ResponseEntity<?> updateCouple(@RequestBody Couple couple) {
        try {
            couple = coupleService.updateCouple(couple);
            log.info("커플정보 업데이트 성공");
            return new ResponseEntity<Couple>(couple, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("커플정보 업데이트 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/send/message")
//    public ResponseEntity<?> sendMessage()

}
