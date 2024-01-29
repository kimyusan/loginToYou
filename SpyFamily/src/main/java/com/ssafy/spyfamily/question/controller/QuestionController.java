package com.ssafy.spyfamily.question.controller;


import com.ssafy.spyfamily.question.service.QuestionService;
import com.ssafy.spyfamily.question.service.QuestionServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getQuestion (@RequestParam Integer todayQuestionId) {
        try {
//            String answer = questionService.
            return new ResponseEntity<String>("", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("질문 받아오기 에러");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
