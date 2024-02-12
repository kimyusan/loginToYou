import React, { useState } from "react";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "./Navbar";
import { useTheme } from "styled-components";

type Props = {};

function MenuSection({}: Props) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const theme = useTheme();

  return (
    <div
      style={{
        height: "5dvh",
        width: "100%",
        backgroundColor: theme.color.bgColor,
      }}
    >
      <BurgerButton
        onClick={() => {
          setIsNavigationOpen((prev) => !prev);
        }}
      >
        {isNavigationOpen ? null : "☰"}
      </BurgerButton>
      <Navbar
        isOpen={isNavigationOpen}
        setIsNavigationOpen={setIsNavigationOpen}
      />
    </div>
  );
}

export default MenuSection;
