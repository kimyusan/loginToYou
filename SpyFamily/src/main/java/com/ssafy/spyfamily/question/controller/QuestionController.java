package com.ssafy.spyfamily.question.controller;


import com.ssafy.spyfamily.question.model.CoupleTodayQuestion;
import com.ssafy.spyfamily.question.repository.CoupleTodayQuestionRepository;
import com.ssafy.spyfamily.question.service.QuestionServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


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

    @PostMapping("/save")
    public ResponseEntity<?> saveQuestion(@RequestBody CoupleTodayQuestion coupleTodayQuestion) {
        try {
            System.out.println("질문 저장들어옴");
            System.out.println(coupleTodayQuestion.toString());
            questionService.saveQuestion(coupleTodayQuestion);

            System.out.println("질문 저장 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("질문 저장 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateQuestion(@RequestBody CoupleTodayQuestion coupleTodayQuestion) {
        try {
            System.out.println("질문 수정들어옴");
            questionService.updateQuestion(coupleTodayQuestion);

            System.out.println("질문 수정 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("질문 수정 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/answer")
    public ResponseEntity<?> getQuestionAnswerByUserId(
            @RequestParam Integer todayQuestionId,
            @RequestParam Integer userId) {

        try {
            System.out.println("질문 대답 불러오기");
            CoupleTodayQuestion coupleTodayQuestion =
                    questionService.getCoupleTodayQuestionById(todayQuestionId, userId);

            System.out.println("질문 대답 불러오기 성공");
            System.out.println(coupleTodayQuestion.toString());
            
            return new ResponseEntity<CoupleTodayQuestion>(coupleTodayQuestion, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("질문 대답 불러오기 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
