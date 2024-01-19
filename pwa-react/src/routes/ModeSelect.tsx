import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { SelectBox } from "../styles/Camera/ModeSelect"
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import HeaderSection from "../components/Main/HeaderSection";

const Camera = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };
  return (
    <>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

      <Navbar isOpen={isNavigationOpen} />
      <SelectBox>
        <Link to="/camera/solo">
          <Paper elevation={3}>
            혼자찍기
          </Paper>
        </Link>

        <Link to="/camera/couple">
          <Paper elevation={3}>
            같이찍기
          </Paper>
        </Link>
      </SelectBox>
    </>

  )
}

export default Camera