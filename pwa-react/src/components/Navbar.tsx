import React, { useState } from "react";
import { Nav } from "../styles/Nav/NavStyle";

type Props = {};

const Navbar = (props: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const onClicked = () => setClicked(!clicked);

  return (
    <>
      <Nav $toggle={clicked}>Navbar</Nav>
    </>
  );
};

export default Navbar;
