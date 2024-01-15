import React from 'react';
import { Header } from './styles/common/header';
import { Button } from './styles/common/button';
import { Card } from './styles/common/card';
import Global from './styles/common/global';

function App() {
  return (
    <div>
      <Global />
      <Header>hhu</Header>
      <Button>링크 보내기</Button>
      <Card>안녕</Card>
      <Card>안녕</Card>
    </div>
  );
}

export default App;
