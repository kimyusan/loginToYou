import React from "react";
import { NavigationContainer, NavigationList } from "../styles/Nav/NavStyle";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import { axiosAuth } from "../util/token";
import { BurgerButton } from "../styles/common/hamburger";

type Props = {
  isOpen: boolean;
  setIsNavigationOpen: (open: boolean) => void;
};

const Navbar = ({ isOpen, setIsNavigationOpen }: Props) => {
  const navigate = useNavigate();
  const { userId, coupleId, name, nickname } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      coupleId: state.coupleId,
      name: state.name,
      nickname: state.nickname,
    }))
  );

  const goChat = async () => {
    const res = await axiosAuth.get("/chat/enter", {
      params: { coupleId: coupleId },
    });
    console.log(res);
    navigate(`/chat/${res.data}`);
  };

  return (
    <NavigationContainer $isOpen={isOpen}>
      <div className="headline">
        <div className="name">{name ? name : nickname} 님</div>
        <BurgerButton
          onClick={() => {
            setIsNavigationOpen(false);
          }}
          style={{ right: "6dvw", top: "3dvh" }}
        >
          ×
        </BurgerButton>
      </div>
      <NavigationList style={{ whiteSpace: "nowrap" }}>
        <div style={{ marginBottom: "2dvh" }}>
          <div className="title">내 정보</div>
          <li onClick={() => navigate(`/couple_info/${coupleId}`)}>
            커플 정보 수정
          </li>
          <li onClick={() => navigate(`/user_info/${userId}`)}>
            회원정보 수정
          </li>
        </div>
        <div style={{ marginBottom: "2dvh" }}>
          <div className="title">바로가기</div>
          <li onClick={() => navigate("/main")}>홈으로</li>

          <div className="middle">
            사진찍기
            <li onClick={() => navigate("/camera/solo")}>가까이서 찍기</li>
            <li onClick={() => navigate("/camera/couple")}>멀리서 찍기</li>
          </div>
          <li onClick={() => navigate("/diary")}>다이어리</li>
          <li onClick={goChat}>채팅</li>
          <li onClick={() => navigate("/calendar")}>캘린더</li>
          <div className="middle">
            알아가기
            <li onClick={() => navigate("/question")}>오늘의 질문</li>
            <li onClick={() => navigate("/balancegame")}>커플 밸런스 게임</li>
            <li>매일매일 챌린지</li>
          </div>
        </div>
        <div className="title">설정</div>

        <li
          onClick={() => {
            navigate(`/settings`);
          }}
        >
          환경설정
        </li>
      </NavigationList>
    </NavigationContainer>
  );
};

export default Navbar;
