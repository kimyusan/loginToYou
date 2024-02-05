package com.ssafy.spyfamily.couple.repository;

import com.ssafy.spyfamily.couple.model.Couple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface CoupleRepository extends JpaRepository<Couple, Integer> {

    @Query("SELECT c FROM Couple c WHERE c.coupleId = :coupleId")
    Couple findByCoupleId(Integer coupleId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Couple c WHERE c.coupleId = :coupleId")
    void deleteByCoupleId(Integer coupleId);

}
