package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {


}
