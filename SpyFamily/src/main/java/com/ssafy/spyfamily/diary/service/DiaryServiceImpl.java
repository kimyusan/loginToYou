package com.ssafy.spyfamily.diary.service;

import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.model.DiaryMemo;
import com.ssafy.spyfamily.diary.repository.DiaryMemoRepository;
import com.ssafy.spyfamily.diary.repository.DiaryRepository;
import com.ssafy.spyfamily.util.FileUtil;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

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
    public ArrayList<DiaryMemo> getDiaryMemo(Integer coupleId, String registerDate) {

        System.out.println("coupleId : " + coupleId);
        System.out.println("registerDate  : " + registerDate);

        ArrayList<DiaryMemo> list = diaryMemoRepository.findByCoupleIdAndRegisterDate(coupleId, registerDate);
        System.out.println("getDiaryMemo");
        System.out.println(list);

        return list;
    }

    @Override
    public void deleteDiaryMemo(Integer diaryMemoId) {
        diaryMemoRepository.deleteById(diaryMemoId);
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
    public void uploadDiary(Diary diary) {
        diaryRepository.save(diary);
    }

    @Override
    public ArrayList<Diary> diaryList(Integer coupleId) {
        return diaryRepository.findByCoupleId(coupleId);
    }

    @Override
    public void deleteDiary(Integer diaryId) {
        try {
            Diary diary = getDiary(diaryId).get();
            fileUtil.deleteFile(diary);
            System.out.println("다이어리 사진 삭제(서버) 성공");
            diaryRepository.deleteById(diaryId);
            System.out.println("다이어리 사진 삭제 단계(DB) 성공");

            // 문자열을 LocalDateTime 객체로 파싱
            LocalDateTime dateTime = LocalDateTime.parse(diary.getRegisterDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            // LocalDateTime 객체를 다시 원하는 형식의 문자열로 포맷팅
            String formattedDate = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            System.out.println("삭제후 해당 날짜의 다이어리 개수 찾기");
            int count = diaryMemoRepository.countByCoupleIdAndRegisterDate(diary.getCoupleId(), formattedDate);

            if (count == 0) {
                System.out.println("사진이 남아있지 않다면");
                diaryMemoRepository.deleteByCoupleIdAndRegisterDate(diary.getCoupleId(), formattedDate);
            } else {
                System.out.println("남겨진 다이어리 개수 : " + count);
            }

            System.out.println("성공적 삭제");

        } catch (IOException e) {
            System.out.println("다이어리 사진 실패");
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<Diary> getDiary(Integer diaryId) {
        return diaryRepository.findById(diaryId);
    }

    @Override
    public Integer countDiary(String registDate) {
        return diaryRepository.countByRegisterDate(registDate);
    }



}
