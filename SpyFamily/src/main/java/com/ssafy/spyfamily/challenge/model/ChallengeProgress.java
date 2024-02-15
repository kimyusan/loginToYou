package com.ssafy.spyfamily.challenge.model;

import com.ssafy.spyfamily.user.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class ChallengeProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer challengeProgressId;
    private Integer progress;
    private LocalDateTime prevDate;
    private boolean isDone;

    @ManyToOne
    @JoinColumn(name="challenge_list_id")
    private ChallengeList challengeList;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
