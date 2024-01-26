package com.ssafy.spyfamily.user.repository;

import com.ssafy.spyfamily.user.model.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<ProfileImg, Integer> {


}
