package com.ssafy.spyfamily.balance.controller;

import com.ssafy.spyfamily.balance.model.Balance;
import com.ssafy.spyfamily.balance.model.CoupleBalance;
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

            Integer dayOfMonth = date.getDayOfMonth();
            System.out.println("오늘 날짜를 일수로 변환하면 : " + dayOfMonth);

            Balance balance = balanceService.getBalance(dayOfMonth);

            return new ResponseEntity<Balance>(balance,HttpStatus.OK);
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
            CoupleBalance coupleBalance = balanceService.getBalanceAnswer(userId, BalanceGameId);
            System.out.println("커플 대답 불러오기");
            System.out.println(coupleBalance.toString());

            return new ResponseEntity<CoupleBalance>(coupleBalance, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("밸런스 게임 대답 불러오기 실패");
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveBalanceAnswer(@RequestBody CoupleBalance coupleBalance) {
        try {
            balanceService.saveBalance(coupleBalance);

            System.out.println("저장 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("저장 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBalanceAnswer(@RequestBody CoupleBalance coupleBalance) {
        try {
            balanceService.updateBalance(coupleBalance);

            System.out.println("수정 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("수정 실패");
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
    }
    

}
