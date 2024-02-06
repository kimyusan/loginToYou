package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.BalanceGame;
import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;
import com.ssafy.spyfamily.balance.repository.BalanceRepository;
import com.ssafy.spyfamily.balance.repository.CoupleBalanceRepository;
import org.springframework.stereotype.Service;

@Service
public class BalanceServiceImpl implements BalanceService{

    private final BalanceRepository balanceRepository;
    private final CoupleBalanceRepository coupleBalanceRepository;

    public BalanceServiceImpl(BalanceRepository balanceRepository,
                              CoupleBalanceRepository coupleBalanceRepository) {
        this.balanceRepository = balanceRepository;
        this.coupleBalanceRepository = coupleBalanceRepository;
    }

    @Override
    public BalanceGame getBalance(Integer balanceGameId) {
        return balanceRepository.findByBalanceGameId(balanceGameId);
    }

    @Override
    public CoupleBalanceGame getBalanceAnswer(Integer userId, Integer balanceGameId) {
        return coupleBalanceRepository.findByBalanceGameIdAndUserId(userId, balanceGameId);
    }

    @Override
    public void saveBalance(CoupleBalanceGame coupleBalanceGame) {
        BalanceGame balanceGame = balanceRepository.findByBalanceGameId(coupleBalanceGame.getBalanceGameId());
        balanceGame.setFVote(balanceGame.getFVote() + 1);
        balanceGame.setSVote(balanceGame.getSVote() + 1);
        balanceRepository.save(balanceGame);

        coupleBalanceRepository.save(coupleBalanceGame);
    }

    @Override
    public void updateBalance(CoupleBalanceGame coupleBalanceGame) {
        coupleBalanceRepository.save(coupleBalanceGame);
    }

}
