import React from "react";
import { useParams } from "react-router-dom";

import { Header } from "../styles/common/header";
import { Button } from "../styles/common/button";
import { Card } from "../styles/common/card";

const Main = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <Button>링크 보내기</Button>
      <Card>안녕</Card>
      <Card>안녕</Card>
    </>
  );
};

export default Main;
