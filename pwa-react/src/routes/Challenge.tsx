import styled from "styled-components";
import MenuSection from "../components/MenuSection";
import TokenCheker from "../util/TokenCheker";
import ChallengeItem from "../components/Challenge/ChallengeItem";
import { Title } from "../styles/BalanceGame/BalanceGame";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import { useShallow } from "zustand/react/shallow";

export interface challengeInfo {
  challengeListId: number;
  challengeProgressId: number;
  challengeTypeId: number;
  content: string;
  continuous: boolean;
  done: boolean;
  goal: number;
  prevDate: string;
  progress: number;
  subject: string;
  type: string;
  userId: number;
}

const Challenge = () => {
  // 챌린지 요청 받아올 배열
  const [challengeList, setChallengeList] = useState([]);

  // PATH, token 가져오기
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  // 유저별 챌린지 리스트 요청
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${PATH}/challenge/get/challenges`, {
        params: {
          userId: "20",
        },
        headers: {
          Authorization: token,
        },
      });

      setChallengeList(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <TokenCheker />
      <MenuSection />
      <Title>챌린지</Title>

      {challengeList.map((challenge: challengeInfo, index) => (
        <ChallengeItem key={index} challenge={challenge} />
      ))}
    </>
  );
};

export default Challenge;
