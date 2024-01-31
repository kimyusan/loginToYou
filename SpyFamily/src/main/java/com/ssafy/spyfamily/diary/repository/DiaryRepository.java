package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    ArrayList<Diary> findByCoupleId(Integer coupleId);

    Integer countByRegisterDate(String registerDate);
}
