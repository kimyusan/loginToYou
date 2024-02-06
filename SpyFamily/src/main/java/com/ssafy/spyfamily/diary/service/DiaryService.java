package com.ssafy.spyfamily.diary.service;

import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.model.DiaryMemo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public interface DiaryService {

    ArrayList<DiaryMemo> getDiaryMemo(Integer coupleId, String registerDate);

    void deleteDiaryMemo(Integer diaryId);

    void registDiaryMemo(DiaryMemo diaryMemo);

    void updateDiaryMemo(DiaryMemo diaryMemo);

    void uploadDiary(Diary diary);

    ArrayList<Diary> diaryList(Integer coupleId);

    void deleteDiary(Integer diaryId);

    Optional<Diary> getDiary(Integer diaryId);

    Integer countDiary(Integer coupleId,String registDate);
}
