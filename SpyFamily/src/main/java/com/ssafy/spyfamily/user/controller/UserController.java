package com.ssafy.spyfamily.user.controller;

import com.ssafy.spyfamily.user.model.User;
import com.ssafy.spyfamily.user.service.UserServiceImpl;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController()
@RequestMapping(value = "/user", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    /**
     * 유저 정보 수정
     * @param user 수정해야할 유저 정보
     * @return 수정된 유저정보
     */
    @PutMapping("/update")
    public ResponseEntity<?> userUpdate(@RequestBody User user) {
        try {
            System.out.println("유저 정보 업데이트 시작");
            User new_user = userService.userUpdate(user);
            System.out.println("유저 정보 업데이트 성공");
            System.out.println(new_user.toString());
            System.out.println();
            return new ResponseEntity<User>(new_user, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("유저 정보 업데이트 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 이메일로 회원 정보 가져오기
     */
    @GetMapping("/info")
    public ResponseEntity<?> info(@RequestParam(name="email") String email) {
        User user = userService.getUserByEmail(email);

        if(user != null) {
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }

        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

}
