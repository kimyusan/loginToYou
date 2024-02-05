import React, { useState } from "react";
import Navbar from "../Navbar";
import { BurgerButton } from "../../styles/common/hamburger";
import { Header } from "../../styles/Settings/UI";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

type Props = {};

function SettingsHeader({}: Props) {
  const navigate = useNavigate();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <>
      <Header>
        <IconContext.Provider value={{ size: "20px" }}>
          <GoArrowLeft
            onClick={() => {
              navigate(-1);
            }}
          />
        </IconContext.Provider>
      </Header>
      <Navbar isOpen={isNavigationOpen} />
    </>
  );
}

export default SettingsHeader;
