package com.ssafy.spyfamily.diary.service;

import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.repository.DiaryRepository;
import com.ssafy.spyfamily.util.FileUtil;
import org.springframework.stereotype.Service;

@Service
public class DiaryServiceImpl implements DiaryService{

    private final DiaryRepository diaryRepository;
    private final FileUtil fileUtil;

    public DiaryServiceImpl(DiaryRepository diaryRepository, FileUtil fileUtil) {
        this.diaryRepository = diaryRepository;
        this.fileUtil = fileUtil;
    }

    @Override
    public void uploadPicture(Diary diary) {
        diaryRepository.save(diary);
    }
}
