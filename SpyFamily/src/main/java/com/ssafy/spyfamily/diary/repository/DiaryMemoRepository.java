package com.ssafy.spyfamily.diary.repository;

import com.ssafy.spyfamily.diary.model.DiaryMemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface DiaryMemoRepository extends JpaRepository<DiaryMemo, Integer> {

    @Query("SELECT d FROM DiaryMemo d WHERE d.diaryId = :diaryId AND d.userId = :userId")
    DiaryMemo findByDiaryId(Integer diaryId, Integer userId);

}
