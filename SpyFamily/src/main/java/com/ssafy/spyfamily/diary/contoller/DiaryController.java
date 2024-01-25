package com.ssafy.spyfamily.diary.contoller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.diary.service.DiaryServiceImpl;
import com.ssafy.spyfamily.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Slf4j
@RestController
@RequestMapping(value = "/diary", produces = "application/json")
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

    @PostMapping("/upload")
    public ResponseEntity<?> registProfile(MultipartHttpServletRequest formData) {
        System.out.println("이미지 등록 들어옴 : " + formData);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Diary diary = objectMapper.readValue(formData.getParameter("diary"), Diary.class);
            MultipartFile multipartFiles = formData.getFile("imgInfo");

            System.out.println("regist multipartFile : " + multipartFiles);

            diary = fileUtil.storeImg(multipartFiles, diary.getDiaryId());
            diaryService.uploadPicture(diary);

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("board uploadImg Controller Error");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
