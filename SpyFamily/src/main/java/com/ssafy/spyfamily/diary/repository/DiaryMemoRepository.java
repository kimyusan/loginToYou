package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.DiaryMemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface DiaryMemoRepository extends JpaRepository<DiaryMemo, Integer> {

    @Query("SELECT d FROM DiaryMemo d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    ArrayList<DiaryMemo> findByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

    @Query("SELECT d FROM DiaryMemo d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    Integer countByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

    @Query("DELETE DiaryMemo d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    void deleteByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

}
