import styled from "styled-components";
import MenuSection from "../components/MenuSection";
import TokenCheker from "../util/TokenCheker";
import ChallengeDetailModal from "../components/Challenge/ChallengeDetailModal";
import ChallengeItem from "../components/Challenge/ChallengeItem";
import { Title } from "../styles/BalanceGame/BalanceGame";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import { useShallow } from "zustand/react/shallow";

const Challenge = () => {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  const [challengeList, setChallengeList] = useState([]);

  const onClick = (e: React.MouseEvent) => {
    console.log(challengeList);
  };

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
      <button onClick={onClick}>콘솔</button>
      <TokenCheker />
      <MenuSection />
      <Title>챌린지</Title>

      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
      <ChallengeItem></ChallengeItem>
    </>
  );
};

export default Challenge;
