import React, { useState } from 'react';

import styled from '@emotion/styled';

import Gachapon from './Gachapon';

const Container = styled.div({
  maxWidth: '600px',
  height: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function App() {
  const [idea, setIdea] = useState('');

  function onOpen(content) {
    setIdea(content);
  }

  return (
    <Container>
      <p>뉴노멀 시대를 살아가는 우리의 추억 생성기, 데잇가챠</p>
      <p data-testid="idea">{ idea }</p>
      <Gachapon onOpen={onOpen} />
    </Container>
  );
}
