package com.ssafy.spyfamily.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.user.model.ProfileImg;
import com.ssafy.spyfamily.user.service.UserProfileServiceImpl;
import com.ssafy.spyfamily.util.FileUtil;
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

@RestController()
@RequestMapping(value = "/profile", produces = "application/json")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 6000)
public class UserProfileController {

    @Value("${file.path}")
    private String uploadPath;

    @Value("${file.path.upload-images}")
    private String uploadImagePath;

    @Value("${file.path.upload-files}")
    private String uploadFilePath;

    private final UserProfileServiceImpl userProfileService;

    private final FileUtil fileUtil;

    public UserProfileController(UserProfileServiceImpl userProfileService, FileUtil fileUtil) {
        this.userProfileService = userProfileService;
        this.fileUtil = fileUtil;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> userProfileUpload(MultipartHttpServletRequest formData) {
        System.out.println("프로필 사진 등록 들어옴 : " + formData);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProfileImg profileImg = objectMapper.readValue(formData.getParameter("profileImg"), ProfileImg.class);
            MultipartFile multipartFiles = formData.getFile("imgInfo");

            System.out.println("regist multipartFile : " + multipartFiles);

            profileImg = fileUtil.storeImg(multipartFiles, profileImg);
            userProfileService.uploadProfile(profileImg);

            return new ResponseEntity<ProfileImg>(profileImg, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("board uploadImg Controller Error 프사 업로드 하는중 에러");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/read")
    public ResponseEntity<?> getUserImg(@RequestParam Integer userId) {
        try {
            ProfileImg profileImg = userProfileService.getUserProfile(userId);
            System.out.println("프사 불러오기 id : " + userId);
            System.out.println(profileImg);

            return  new ResponseEntity<ProfileImg>(profileImg, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("board uploadImg Controller Error 프사 불러오는 중 에러");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getImg/{saveFolder}/{originalName}/{saveName}")
    public ResponseEntity<?> getImg(@PathVariable("saveFolder") String saveFolder,
                                    @PathVariable("originalName") String originalName,
                                    @PathVariable("saveName") String saveName)  {

        System.out.println("프로필 사진 불러오기");
        String file = uploadImagePath + File.separator +saveFolder + File.separator + saveName;

        try {
            Path filePath = Paths.get(file);

            Resource resource = new FileSystemResource(file);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", Files.probeContentType(filePath));

            System.out.println("resource! : " + resource);

            return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);

        } catch (IOException e) {
            System.out.println("프사 로드 실패");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PutMapping("/update")
    public ResponseEntity<?> updateUserImg(MultipartHttpServletRequest formData) {
        System.out.println("프로필 사진 수정 들어옴 : " + formData);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProfileImg profileImg = objectMapper.readValue(formData.getParameter("profileImg"), ProfileImg.class);
            MultipartFile multipartFiles = formData.getFile("imgInfo");

            System.out.println("regist multipartFile : " + multipartFiles);
            Integer tempID = profileImg.getProfileImgId();

            // 삭제 후
            System.out.println("기존 프사 삭제");
            fileUtil.deleteFile(profileImg);
            userProfileService.deleteUserProfile(profileImg.getProfileImgId());

            // ProfileImgId가 삭제후 추가시 증가되는것을 막기 위함.
            profileImg.setProfileImgId(tempID);

            // 다시 저장
            System.out.println("새 프사 등록");
            profileImg = fileUtil.storeImg(multipartFiles, profileImg);
            userProfileService.uploadProfile(profileImg);

            return new ResponseEntity<ProfileImg>(profileImg, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("board uploadImg Controller Error. 프사 업데이트 중 에러");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserProfile(Integer profileImgId) {
        System.out.println("기존 프사 삭제");

        try {
            System.out.println("기존 프사 삭제 진행 (서버)");
            fileUtil.deleteProfileFile(userProfileService.getProfileImg(profileImgId));
            System.out.println("기존 프사 삭제 진행 (DB)");
            userProfileService.deleteUserProfile(profileImgId);

            System.out.println("기존 프사 삭제 성공");
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("board uploadImg Controller Error. 프사 삭제 중 에러");
            e.printStackTrace();
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
