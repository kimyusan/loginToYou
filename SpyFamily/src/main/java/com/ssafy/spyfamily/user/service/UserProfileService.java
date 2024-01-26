package com.ssafy.spyfamily.user.service;


import com.ssafy.spyfamily.user.model.ProfileImg;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserProfileService {
    void uploadProfile(ProfileImg profileImg);

    ProfileImg getUserProfile(Integer userId);

    void deleteUserProfile(Integer profileImgId);

    Optional<ProfileImg> getProfileImg(Integer profileImgId);
}
