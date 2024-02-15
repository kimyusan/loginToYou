package com.ssafy.spyfamily.challenge.repository;

import com.ssafy.spyfamily.challenge.model.ChallengeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeTypeRespository extends JpaRepository<ChallengeType, Integer> {
}
