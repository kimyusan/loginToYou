import React from "react";
import { NavigationContainer, NavigationList } from "../styles/Nav/NavStyle";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

type Props = {
  isOpen: boolean;
};

const Navbar = ({ isOpen }: Props) => {
  const navigate = useNavigate();
  const { userId } = useUserStore();

  const goHome = () => {
    navigate("/main");
  };
  const goInfo = () => {
    navigate(`/user_info/${userId}`);
  };
  const goSettings = () => {
    navigate(`/settings`);
  };

  return (
    <NavigationContainer $isOpen={isOpen}>
      <NavigationList>
        <li onClick={goHome}>홈으로</li>
        <li onClick={goInfo}>회원정보 수정</li>
        <li onClick={goSettings}>환경설정</li>
      </NavigationList>
    </NavigationContainer>
  );
};

export default Navbar;
