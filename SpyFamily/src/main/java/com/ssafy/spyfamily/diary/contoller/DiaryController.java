package com.ssafy.spyfamily.diary.contoller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.diary.model.Diary;
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
import java.util.ArrayList;

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
    public ResponseEntity<?> diaryUpload(MultipartHttpServletRequest formData) {
        System.out.println("이미지 등록 들어옴 : " + formData);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Diary diary = objectMapper.readValue(formData.getParameter("diary"), Diary.class);
            MultipartFile multipartFiles = formData.getFile("imgInfo");

            System.out.println("regist multipartFile : " + multipartFiles);

            diary = fileUtil.storeImg(multipartFiles, diary);
            diaryService.uploadPicture(diary);

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("board uploadImg Controller Error");
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

            System.out.println("resource! : " + resource);

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
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDiary(@RequestBody Diary diary) {
        diaryService.uploadPicture(diary);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
