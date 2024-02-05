package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    ArrayList<Diary> findByCoupleId(Integer coupleId);

    @Query("SELECT COUNT(*) FROM Diary d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    Integer countByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

    @Query("SELECT d FROM Diary  d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    ArrayList<Diary> findByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

    @Transactional
    @Modifying
    @Query("DELETE FROM Diary d WHERE d.coupleId = :coupleId")
    void deleteByCoupleId(Integer coupleId);

}
