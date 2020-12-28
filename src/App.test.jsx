import React from 'react';

import { render } from '@testing-library/react';

import { ContextExclusionPlugin } from 'webpack';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render App', () => {
    const { container } = render(<App />);

    expect(container).not.toBeNull();
  });
});
