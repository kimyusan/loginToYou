package com.ssafy.spyfamily.diary.service;

import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface DiaryService {

    void uploadPicture(Diary diary);

    ArrayList<Diary> diaryList(Integer coupleId);

    void deleteDiary(Integer diaryId);
}
