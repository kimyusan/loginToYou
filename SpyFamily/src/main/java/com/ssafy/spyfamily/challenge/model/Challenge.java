package com.ssafy.spyfamily.challenge.model;

import com.ssafy.spyfamily.user.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int challengeId;
    private int challengeListId;
    private int userId;
    private int progress;
    private boolean isDone;

    @ManyToOne
    @JoinColumn(name="challenge_list_id")
    private ChallengeList challengeList;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
