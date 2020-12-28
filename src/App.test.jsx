import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('Gachapon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderApp() {
    const { getByTestId } = render(<App />);

    return {
      handle: getByTestId('handle'),
      capsule: getByTestId('capsule'),
    };
  }

  const { handle, capsule } = renderApp();
  const handleChangeState = jest.fn();

  context('when handle is clicked', () => {
    it('calls handleChangeState', () => {
      fireEvent.click(handle);
      expect(capsule).not.toBeNull();
      expect(handleChangeState).toHaveBeenCalled();
    });
  });

  context('when handle is spinning', () => {
    it('does not call handleChangeState', () => {
      fireEvent.click(handle);
      expect(handleChangeState).not.toBeCalled();
    });
  });
});
