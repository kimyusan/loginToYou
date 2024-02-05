package com.ssafy.spyfamily.balance.controller;

import com.ssafy.spyfamily.balance.service.BalanceServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/balance", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class BalanceController {

    private final BalanceServiceImpl balanceService;

    public BalanceController(BalanceServiceImpl balanceService) {
        this.balanceService = balanceService;
    }

    

}
