package com.ssafy.spyfamily.question.controller;


import com.ssafy.spyfamily.question.model.TodayQuestion;
import com.ssafy.spyfamily.question.service.QuestionService;
import com.ssafy.spyfamily.question.service.QuestionServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController()
@RequestMapping(value = "/question", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class QuestionController {

    private final QuestionServiceImpl questionService;

    public QuestionController(QuestionServiceImpl questionService) {
        this.questionService = questionService;
    }

    // 오늘의 질문을 받아옵니다.
    @GetMapping("/get")
    public ResponseEntity<?> getQuestion (@RequestParam String dateString) {
        try {
            // 날짜 변환
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            LocalDate date = LocalDate.parse(dateString, formatter);

            Integer dayOfMonth = date.getDayOfMonth();
            System.out.println("오늘 날짜를 일수로 변환하면 : " + dayOfMonth);

            String answer = questionService.getQuestion(dayOfMonth).getQuestion();

            System.out.println("질문 받기");
            System.out.println(answer);

            return new ResponseEntity<String>(answer, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("질문 받아오기 에러");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

}
