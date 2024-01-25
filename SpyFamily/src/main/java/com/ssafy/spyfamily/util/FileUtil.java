package com.ssafy.spyfamily.util;


import com.ssafy.spyfamily.diary.model.Diary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Component
public class FileUtil {

    @Value("${file.path.upload-images}")
    private String uploadImagePath;

    // 이미지 저장 및 엔티티로 변환
    public Diary storeImg(MultipartFile multipartFile, Integer diaryId) throws IOException {
        if(multipartFile.isEmpty()) {
            return null;
        }

        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = uploadImagePath + File.separator + today;
        File folder = new File(saveFolder);
        if (!folder.exists())
            folder.mkdirs();

        Diary imgInfoDto = new Diary();
        String originalFileName = multipartFile.getOriginalFilename();
        if (!originalFileName.isEmpty()) {
            String saveFileName = UUID.randomUUID().toString()
                    + originalFileName.substring(originalFileName.lastIndexOf('.'));
            imgInfoDto.setSaveFolder(today);
            imgInfoDto.setOriginalName(originalFileName);
            imgInfoDto.setSaveName(saveFileName);
            imgInfoDto.setDiaryId(diaryId);

            // 파일 실제 저장
            multipartFile.transferTo(new File(folder, saveFileName));
        }

        return imgInfoDto;
    }


}
