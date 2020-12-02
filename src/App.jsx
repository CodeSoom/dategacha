import React from 'react';

import ideas from '../fixtures/ideas';

function handleClick(event) {
  event.preventDefault();

  document.querySelector('[data-testid="idea"]').innerHTML = ideas[Math.floor(Math.random() * 30)].description;
}

export default function App() {
  return (
    <>
      <p>뉴노멀 시대를 살아가는 우리의 추억 생성기, 데잇가챠</p>
      <button type="button" onClick={handleClick}>데이트 아이디어 얻기</button>
      <p data-testid="idea" />
    </>
  );
}
