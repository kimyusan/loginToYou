package com.ssafy.spyfamily.diary.service;

import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.stereotype.Service;

@Service
public interface DiaryService {

    void uploadPicture(Diary diary);
}
