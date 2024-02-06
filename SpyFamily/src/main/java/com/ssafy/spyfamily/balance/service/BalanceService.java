package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;

public interface BalanceService {
    BalanceGame getBalance(Integer balanceGameId);

    CoupleBalanceGame getBalanceAnswer(Integer userId, Integer balanceGameId);

    void saveBalance(CoupleBalanceGame coupleBalanceGame);

    void updateBalance(CoupleBalanceGame coupleBalanceGame);
}
