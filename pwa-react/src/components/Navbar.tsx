import React from "react";
import { NavigationContainer, NavigationList } from "../styles/Nav/NavStyle";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
};

const Navbar = ({ isOpen }: Props) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/main");
  };

  return (
    <NavigationContainer $isOpen={isOpen}>
      <NavigationList>
        <li onClick={goHome}>홈으로</li>
        <li>회원정보 수정</li>
        <li>환경설정</li>
      </NavigationList>
    </NavigationContainer>
  );
};

export default Navbar;
