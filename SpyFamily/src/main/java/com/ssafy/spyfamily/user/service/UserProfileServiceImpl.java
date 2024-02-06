package com.ssafy.spyfamily.user.service;

import com.ssafy.spyfamily.user.model.ProfileImg;
import com.ssafy.spyfamily.user.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserProfileServiceImpl implements UserProfileService{

    private final UserProfileRepository userProfileRepository;

    public UserProfileServiceImpl(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    public void uploadProfile(ProfileImg profileImg) {
        userProfileRepository.save(profileImg);
    }

    @Override
    public ProfileImg getUserProfile(Integer userId) {
        return userProfileRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void deleteUserProfile(Integer profileImgId) {
        userProfileRepository.deleteByProfileImgId(profileImgId);
    }

    @Override
    public Optional<ProfileImg> getProfileImg(Integer profileImgId) {
       return userProfileRepository.findByProfileImgId(profileImgId);
    }

    @Override
    public Long existImgCount(Integer userId) {
        return userProfileRepository.countByUserId(userId);
    }

}
