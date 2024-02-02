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

            if(diary.getIsThumbnail() == 1) {
                try {
                    ArrayList<Diary> list
                            = diaryRepository.findByCoupleIdAndRegisterDate(diary.getCoupleId(), diary.getRegisterDate());

                    System.out.println("그날 다이어리 리스트 불러오기 성공");
                    System.out.println(list);

                    if (list.size() != 0) {
                        list.get(0).setIsThumbnail(1);
                        diaryRepository.save(list.get(0));
                        System.out.println("썸네일 갱신 성공");
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("썸네일 갱신 실패");
                    return;
                }
            }

            fileUtil.deleteFile(diary);
            System.out.println("다이어리 사진 삭제(서버) 성공");
            diaryRepository.deleteById(diaryId);
            System.out.println("다이어리 사진 삭제 단계(DB) 성공");

            System.out.println("삭제후 해당 날짜의 다이어리 개수 찾기");
            Long count = diaryMemoRepository.countByCoupleIdAndRegisterDate(diary.getCoupleId(), diary.getRegisterDate());

            if (count == 0) {
                System.out.println("사진이 남아있지 않다면");
                diaryMemoRepository.deleteByCoupleIdAndRegisterDate(diary.getCoupleId(), diary.getRegisterDate());
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
    public Integer countDiary(Integer userId,String registDate) {
        return diaryRepository.countByCoupleIdAndRegisterDate(userId, registDate);
    }



}
