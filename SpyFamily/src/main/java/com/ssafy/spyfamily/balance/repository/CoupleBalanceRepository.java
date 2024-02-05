package com.ssafy.spyfamily.balance.repository;

import com.ssafy.spyfamily.balance.model.CoupleBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoupleBalanceRepository extends JpaRepository<CoupleBalance, Integer> {

}
