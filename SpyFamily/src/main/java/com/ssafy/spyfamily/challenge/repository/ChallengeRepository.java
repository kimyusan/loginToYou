package com.ssafy.spyfamily.challenge.repository;

import com.ssafy.spyfamily.challenge.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {

}
