package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.Balance;
import com.ssafy.spyfamily.balance.model.CoupleBalance;

public interface BalanceService {
    Balance getBalance(Integer balanceGameId);

    CoupleBalance getBalanceAnswer(Integer userId, Integer balanceGameId);

    void saveBalance(CoupleBalance coupleBalance);

    void updateBalance(CoupleBalance coupleBalance);
}
