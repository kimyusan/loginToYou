package com.ssafy.spyfamily.couple.controller;

import com.ssafy.spyfamily.couple.service.CoupleServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(value = "/couple", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class CoupleController {

    private final CoupleServiceImpl coupleService;

    public CoupleController(CoupleServiceImpl coupleService) {
        this.coupleService = coupleService;
    }

    @RequestMapping(value = "/create/couple")
    public ResponseEntity<?> createCouple(@RequestParam String emailA, @RequestParam String emailB) {
        return ResponseEntity.ok(coupleService.coupleCteate(emailA, emailB));
    }

}
