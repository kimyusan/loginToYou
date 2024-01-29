package com.ssafy.spyfamily.util;


import com.ssafy.spyfamily.diary.model.Diary;
import com.ssafy.spyfamily.user.model.ProfileImg;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
public class FileUtil {

    @Value("${file.path.upload-images}")
    private String uploadImagePath;

    // 이미지 저장 및 엔티티로 변환(다이어리)
    public Diary storeImg(MultipartFile multipartFile, Diary diary) throws IOException {
        if(multipartFile.isEmpty()) {
            return null;
        }

        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String diary_date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());


        String saveFolder = uploadImagePath + File.separator + today;
        File folder = new File(saveFolder);
        if (!folder.exists())
            folder.mkdirs();

        String originalFileName = multipartFile.getOriginalFilename();

        if (!originalFileName.contains(".")) {
            originalFileName += ".png";
        }

        if (!originalFileName.isEmpty()) {
            String saveFileName = UUID.randomUUID().toString()
                    + originalFileName.substring(originalFileName.lastIndexOf('.'));
            diary.setSaveFolder(today);
            diary.setOriginalName(originalFileName);
            diary.setSaveName(saveFileName);
            diary.setDiaryId(diary.getDiaryId());
            diary.setRegisterDate(diary_date);

            // 파일 실제 저장
            multipartFile.transferTo(new File(folder, saveFileName));
        }

        return diary;
    }

    public ProfileImg storeImg(MultipartFile multipartFile, ProfileImg profileImg) throws IOException {
        if(multipartFile.isEmpty()) {
            return null;
        }

        String today = new SimpleDateFormat("yyMMdd").format(new Date());

        String saveFolder = uploadImagePath + File.separator + today + "_profile";
        File folder = new File(saveFolder);
        if (!folder.exists())
            folder.mkdirs();

        String originalFileName = multipartFile.getOriginalFilename();

        if (!originalFileName.contains(".")) {
            originalFileName += ".png";
        }

        if (!originalFileName.isEmpty()) {
            String saveFileName = UUID.randomUUID().toString()
                    + originalFileName.substring(originalFileName.lastIndexOf('.'));
            profileImg.setSaveFolder(today + "_profile");
            profileImg.setOriginalName(originalFileName);
            profileImg.setSaveName(saveFileName);

            // 파일 실제 저장
            multipartFile.transferTo(new File(folder, saveFileName));
        }

        return profileImg;
    }

    // 객체로 프로필 사진 삭제
    public void deleteFile(ProfileImg profileImg) throws IOException {
        // 파일의 경로 생성
        String filePath = uploadImagePath + File.separator + profileImg.getSaveFolder() + File.separator + profileImg.getSaveName();
        Path path = Paths.get(filePath);

        // 파일 삭제
        Files.deleteIfExists(path);
    }

    // 아이디로 프로필 사진 삭제
    public void deleteProfileFile(Optional<ProfileImg> profileImg) throws IOException {
        // 파일의 경로 생성
        String filePath = uploadImagePath + File.separator + profileImg.get().getSaveFolder() + File.separator + profileImg.get().getSaveName();
        Path path = Paths.get(filePath);

        // 파일 삭제
        Files.deleteIfExists(path);
    }
    // 다이어리 삭제
    public void deleteFile(Optional<Diary> diary) throws IOException {
        // 파일의 경로 생성
        String filePath = uploadImagePath + File.separator + diary.get().getSaveFolder() + File.separator + diary.get().getSaveName();
        Path path = Paths.get(filePath);

        // 파일 삭제
        Files.deleteIfExists(path);
    }
}
