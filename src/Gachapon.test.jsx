import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Gachapon from './Gachapon';

describe('Gachapon', () => {
  const { getByTestId } = render(<Gachapon />);

  it('changes state to spinning', () => {
    fireEvent.click(getByTestId('handle'));

    expect(getByTestId('capsule')).not.toBeNull();

    // fireEvent.click(getByTestId('capsule'));
  });
});
