package com.ssafy.spyfamily.balance.repository;

import com.ssafy.spyfamily.balance.model.CoupleBalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoupleBalanceRepository extends JpaRepository<CoupleBalanceGame, Integer> {

    @Query("SELECT c FROM CoupleBalanceGame c WHERE c.userId = :userId AND c.balanceGameId = :balanceGameId")
    CoupleBalanceGame findByBalanceGameIdAndUserId(Integer userId, Integer balanceGameId);

    Long countAllByUserIdAndBalanceGameId(Integer userId, Integer balanceGameId);

    List<CoupleBalanceGame> findByUserId(Integer userId);

}
