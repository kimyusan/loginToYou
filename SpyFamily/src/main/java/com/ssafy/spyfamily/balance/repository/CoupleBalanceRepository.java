package com.ssafy.spyfamily.balance.repository;

import com.ssafy.spyfamily.balance.model.CoupleBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CoupleBalanceRepository extends JpaRepository<CoupleBalance, Integer> {

    @Query("SELECT c FROM CoupleBalance c WHERE c.userId = :userId AND c.balanceGameId = :balanceGameId")
    CoupleBalance findByBalanceGameIdAndUserId(Integer userId, Integer balanceGameId);

}
