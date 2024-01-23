package com.ssafy.spyfamily.user.repository;

import com.ssafy.spyfamily.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    int countByEmail(String email);

    User findByEmail(String email);

}
