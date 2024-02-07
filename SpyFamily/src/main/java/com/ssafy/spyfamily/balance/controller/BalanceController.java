package com.ssafy.spyfamily.balance.controller;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;
import com.ssafy.spyfamily.balance.service.BalanceServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestController
@RequestMapping(value = "/balance", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class BalanceController {

    private final BalanceServiceImpl balanceService;

    public BalanceController(BalanceServiceImpl balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getBalance(@RequestParam String dateString) {
        try {
            System.out.println("밸런스 게임 질문 받기");
            // 날짜 변환
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            LocalDate date = LocalDate.parse(dateString, formatter);

            int dayOfMonth = date.getDayOfMonth();
            int monthValue = date.getMonthValue();

            // 월의 첫 번째 날로부터의 일 수 계산
            int totalDays = dayOfMonth;
            for (int i = 1; i < monthValue; i++) {
                LocalDate firstDayOfMonth = LocalDate.of(date.getYear(), i, 1);
                totalDays += firstDayOfMonth.lengthOfMonth();
            }

            System.out.println("오늘 날짜를 일수로 변환하면 : " + totalDays);

            BalanceGame balanceGame = balanceService.getBalance(totalDays);

            return new ResponseEntity<BalanceGame>(balanceGame,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("밸런스 게임 질문 받기 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/answer")
    public ResponseEntity<?> getBalanceAnswer(@RequestParam Integer userId,
                                              @RequestParam Integer BalanceGameId) {
        try {
            CoupleBalanceGame coupleBalanceGame = balanceService.getBalanceAnswer(userId, BalanceGameId);
            System.out.println("커플 대답 불러오기");
            System.out.println(coupleBalanceGame.toString());

            return new ResponseEntity<CoupleBalanceGame>(coupleBalanceGame, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("밸런스 게임 대답 불러오기 실패");
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveBalanceAnswer(@RequestBody CoupleBalanceGame coupleBalanceGame) {
        try {
            balanceService.saveBalance(coupleBalanceGame);

            System.out.println("저장 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("저장 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBalanceAnswer(@RequestBody CoupleBalanceGame coupleBalanceGame) {
        try {
            balanceService.updateBalance(coupleBalanceGame);

            System.out.println("수정 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("수정 실패");
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
    }
    

}
