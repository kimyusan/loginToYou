package com.ssafy.spyfamily.user.repository;

import com.ssafy.spyfamily.user.model.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<ProfileImg, Integer> {

    ProfileImg findByUserId(Integer userId);

    void deleteByProfileImgId(Integer profileImgId);

    Optional<ProfileImg> findByProfileImgId(Integer profileImgId);

}
