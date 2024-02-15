package com.ssafy.spyfamily.diary.contoller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.model.DiaryMemo;
import com.ssafy.spyfamily.diary.service.DiaryServiceImpl;
import com.ssafy.spyfamily.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Slf4j
@RestController
@RequestMapping(value = "/diary", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class DiaryController {

    @Value("${file.path}")
    private String uploadPath;

    @Value("${file.path.upload-images}")
    private String uploadImagePath;

    @Value("${file.path.upload-files}")
    private String uploadFilePath;

    private final FileUtil fileUtil;
    private final DiaryServiceImpl diaryService;

    public DiaryController(FileUtil fileUtil, DiaryServiceImpl diaryService) {
        this.fileUtil = fileUtil;
        this.diaryService = diaryService;
    }

    @PostMapping("/memo/regist")
    public ResponseEntity<?> diaryMemoRegist(@RequestBody DiaryMemo diaryMemo) {
        try {
            diaryService.registDiaryMemo(diaryMemo);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/memo/get")
    public ResponseEntity<?> getDiaryMemo(@RequestParam Integer coupleId,
                                          @RequestParam String registerDate) {
        try {
            log.info("다이어리 메모 불러오기");
            ArrayList<DiaryMemo> list = diaryService.getDiaryMemo(coupleId, registerDate);
            log.info("다이어리 메모 불러오기 성공");
            return new ResponseEntity<ArrayList<DiaryMemo>>(list, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("다이어리 메모 불러오기 실패");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/memo/update")
    public ResponseEntity<?> updateDiaryMemo(@RequestBody DiaryMemo diaryMemo) {
        try {
            log.info("다이어리 메모 업데이트");
            diaryService.updateDiaryMemo(diaryMemo);
            log.info("다이어리 메모 업데이트 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("다이어리 메모 업데이트 실패");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/memo/delete")
    public ResponseEntity<?> deleteDiaryMemo(@RequestParam Integer diaryMemoId) {
        try {
            log.info("다이어리 메모 삭제");
            diaryService.deleteDiaryMemo(diaryMemoId);
            log.info("다이어리 메모 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("다이어리 메모 실패");
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/upload")
    public ResponseEntity<?> diaryUpload(MultipartHttpServletRequest formData) {
        log.info("이미지 등록 들어옴 : " + formData);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Diary diary = objectMapper.readValue(formData.getParameter("diary"), Diary.class);
            MultipartFile multipartFiles = formData.getFile("imgInfo");

            log.info("regist multipartFile : " + multipartFiles);

            String diary_date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            Integer count = diaryService.countDiary(diary.getCoupleId(), diary_date);
            if (count != 0) {
                diary.setIsThumbnail(0);
            } else {
                diary.setIsThumbnail(1);
            }

            diary = fileUtil.storeImg(multipartFiles, diary);
            diaryService.uploadDiary(diary);

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            log.info("board uploadImg Controller Error");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/read")
    public ResponseEntity<?> getDiary(@RequestParam Integer coupleId) {
        return new ResponseEntity<ArrayList<Diary>>(diaryService.diaryList(coupleId), HttpStatus.OK);
    }

    @GetMapping("/getImg/{saveFolder}/{originalName}/{saveName}")
    public ResponseEntity<?> getImg(@PathVariable("saveFolder") String saveFolder,
                                    @PathVariable("originalName") String originalName,
                                    @PathVariable("saveName") String saveName)  {

        String file = uploadImagePath + File.separator +saveFolder + File.separator + saveName;

        try {
            Path filePath = Paths.get(file);

            Resource resource = new FileSystemResource(file);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", Files.probeContentType(filePath));

            log.info("resource! : " + resource);

            return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteDiary(@RequestParam Integer diaryId) {
        try {
            diaryService.deleteDiary(diaryId);

            log.info("다이어리 사진 삭제 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDiary(@RequestBody Diary diary) {
        diaryService.uploadDiary(diary);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/thumbnail/update")
    public ResponseEntity<?> updateThumbnail(
            @RequestParam Integer diaryId, @RequestParam Integer newDiaryId) {

        try {
            log.info("썸네일 수정");
            Diary old_diary = diaryService.getDiary(diaryId).get();
            Diary new_diary = diaryService.getDiary(newDiaryId).get();
            log.info("썸네일 수정 : 객체 받기");

            old_diary.setIsThumbnail(0);
            new_diary.setIsThumbnail(1);

            log.info("썸네일 수정 : 객체 수정");
            diaryService.uploadDiary(old_diary);
            diaryService.uploadDiary(new_diary);
            log.info("썸네일 수정 : 객체 수정 성공");
            log.info("old_diary : " + old_diary.toString());
            log.info("new_diary : " + new_diary.toString());


            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
