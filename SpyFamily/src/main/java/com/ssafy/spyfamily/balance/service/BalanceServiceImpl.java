package com.ssafy.spyfamily.balance.service;

import com.ssafy.spyfamily.balance.model.Balance;
import com.ssafy.spyfamily.balance.model.CoupleBalance;
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
    public Balance getBalance(Integer balanceGameId) {
        return balanceRepository.findByBalanceGameId(balanceGameId);
    }

    @Override
    public CoupleBalance getBalanceAnswer(Integer userId, Integer balanceGameId) {
        return coupleBalanceRepository.findByBalanceGameIdAndUserId(userId, balanceGameId);
    }

    @Override
    public void saveBalance(CoupleBalance coupleBalance) {
        Balance balance = balanceRepository.findByBalanceGameId(coupleBalance.getBalanceGameId());
        balance.setFVote(balance.getFVote() + 1);
        balance.setSVote(balance.getSVote() + 1);
        balanceRepository.save(balance);

        coupleBalanceRepository.save(coupleBalance);
    }

    @Override
    public void updateBalance(CoupleBalance coupleBalance) {
        coupleBalanceRepository.save(coupleBalance);
    }

}
