import React from "react";
import { NavigationContainer, NavigationList } from "../styles/Nav/NavStyle";

const Navbar: React.FC<{ isOpen: boolean;}> = ({
  isOpen,
}) => {
  return (
    <NavigationContainer $isOpen={isOpen}>
      <NavigationList>
        <li>홈으로</li>
        <li>회원정보 수정</li>
        <li>환경설정</li>
      </NavigationList>
    </NavigationContainer>
  );
};

export default Navbar