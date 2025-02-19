package com.ssafy.spyfamily.config;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController implements ErrorController {

    // 새로고침 방지
    @GetMapping({"/", "/error"})
    public String index() {
        return "index.html";
    }
}