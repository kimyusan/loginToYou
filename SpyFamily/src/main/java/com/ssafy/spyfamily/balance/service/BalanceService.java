package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;
import org.springframework.transaction.annotation.Transactional;

public interface BalanceService {
    BalanceGame getBalance(Integer balanceGameId);

    CoupleBalanceGame getBalanceAnswer(Integer userId, Integer balanceGameId);

    CoupleBalanceGame saveBalance(CoupleBalanceGame coupleBalanceGame);

    @Transactional
    void deleteByUserId(Integer userId);
}
