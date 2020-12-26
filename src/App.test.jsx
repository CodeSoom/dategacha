import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when handle is clicked', () => {
    const { getByTestId } = render(<App />);

    it('calls handleChangeState', () => {
      fireEvent.click(getByTestId('handle'));
      expect(getByTestId('capsule')).not.toBeNull();
    });
  });
});
