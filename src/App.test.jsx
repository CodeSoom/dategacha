import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container, getByText, getByTestId } = render(<App />);

  expect(container).toHaveTextContent('뉴노멀 시대를 살아가는 우리의 추억 생성기');

  expect(getByTestId('idea')).toBeEmptyDOMElement();

  fireEvent.click(getByText('데이트 아이디어 얻기'));

  expect(getByTestId('idea')).not.toBeEmptyDOMElement();
});
