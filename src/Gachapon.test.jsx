import React from 'react';

import { render } from '@testing-library/react';

import Gachapon from './Gachapon';

describe('Gachapon', () => {
  const { container } = render(<Gachapon />);

  expect(container).not.toBeNull();
});
