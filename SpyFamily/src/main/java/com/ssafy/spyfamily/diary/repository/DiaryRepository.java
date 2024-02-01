package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    ArrayList<Diary> findByCoupleId(Integer coupleId);

    Integer countByRegisterDate(String registerDate);

    @Query("SELECT d FROM Diary  d WHERE d.coupleId = :coupleId AND d.registerDate = :registerDate")
    ArrayList<Diary> findByCoupleIdAndRegisterDate(Integer coupleId, String registerDate);

}
