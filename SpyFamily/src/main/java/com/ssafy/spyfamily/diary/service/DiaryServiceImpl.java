package com.ssafy.spyfamily.diary.service;

import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.model.DiaryMemo;
import com.ssafy.spyfamily.diary.repository.DiaryMemoRepository;
import com.ssafy.spyfamily.diary.repository.DiaryRepository;
import com.ssafy.spyfamily.util.FileUtil;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Service
public class DiaryServiceImpl implements DiaryService{

    private final DiaryRepository diaryRepository;

    private final DiaryMemoRepository diaryMemoRepository;
    private final FileUtil fileUtil;

    public DiaryServiceImpl(DiaryRepository diaryRepository, FileUtil fileUtil, DiaryMemoRepository diaryMemoRepository) {
        this.diaryMemoRepository = diaryMemoRepository;
        this.diaryRepository = diaryRepository;
        this.fileUtil = fileUtil;
    }

    @Override
    public ArrayList<DiaryMemo> getDiaryMemo(Integer userIdA, Integer userIdB, Integer diaryId) {

        System.out.println("userId A : " + userIdA);
        System.out.println("userId B : " + userIdB);
        System.out.println("diaryId : " + diaryId);

        ArrayList<DiaryMemo> list = new ArrayList<DiaryMemo>();
        if (diaryMemoRepository.findByDiaryId(diaryId, userIdA) != null) {
            list.add(diaryMemoRepository.findByDiaryId(diaryId, userIdA));
        } else {
            DiaryMemo diaryMemo = new DiaryMemo();
            list.add(diaryMemo);
        }

        if (diaryMemoRepository.findByDiaryId(diaryId, userIdB) != null) {
            list.add(diaryMemoRepository.findByDiaryId(diaryId, userIdB));
        } else {
            DiaryMemo diaryMemo = new DiaryMemo();
            list.add(diaryMemo);
        }

        return list;
    }

    @Override
    public void deleteDiaryMemo(Integer diaryId) {
        diaryMemoRepository.deleteById(diaryId);
    }

    @Override
    public void registDiaryMemo(DiaryMemo diary) {
        String diaty_date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        diary.setRegisterDate(diaty_date);
        diaryMemoRepository.save(diary);
    }

    @Override
    public void updateDiaryMemo(DiaryMemo diaryMemo) {
        diaryMemoRepository.save(diaryMemo);
    }


    @Override
    public void uploadDiaryUpload(Diary diary) {
        diaryRepository.save(diary);
    }

    @Override
    public ArrayList<Diary> diaryList(Integer coupleId) {
        return diaryRepository.findByCoupleId(coupleId);
    }

    @Override
    public void deleteDiary(Integer diaryId) {
        diaryRepository.deleteById(diaryId);
    }
}
