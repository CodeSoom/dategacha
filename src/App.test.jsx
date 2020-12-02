import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container } = render(<App />);

  expect(container).toHaveTextContent('뉴노멀 시대를 살아가는 우리의 추억 생성기');
});
