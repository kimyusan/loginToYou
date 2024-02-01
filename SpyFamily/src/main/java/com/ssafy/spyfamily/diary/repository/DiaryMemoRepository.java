package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.model.DiaryMemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


@Repository
public interface DiaryMemoRepository extends JpaRepository<DiaryMemo, Integer> {

    @Query("SELECT d FROM DiaryMemo d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    ArrayList<DiaryMemo> findByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

    @Query("SELECT COUNT(d) FROM Diary d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    Long countByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);


    @Transactional
    @Modifying
    @Query("DELETE FROM DiaryMemo d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    void deleteByCoupleIdAndRegisterDate(@Param("coupleId") Integer coupleId, @Param("registerDate") String registerDate);

}
