import React from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';
import { matchers } from '@emotion/jest';

import Gachapon from './Gachapon';

expect.extend(matchers);

describe('Gachapon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  const handleClickHandle = jest.fn();
  const handleClickCapsule = jest.fn();

  function renderApp({ gachaponState, capsules, screenState }) {
    const { getByTestId } = render(<Gachapon
      gachapon={gachaponState}
      capsules={capsules}
      screen={screenState}
      onClickHandle={handleClickHandle}
      onClickCapsule={handleClickCapsule}
    />);

    return {
      screen: getByTestId('screen'),
      coin: getByTestId('coin'),
      handle: getByTestId('handle'),
      capsule: getByTestId('capsule'),
    };
  }

  context('when no ideas have been revealed', () => {
    const gachaponState = 'reset';
    const capsules = [];
    const screenState = 'title';

    context('when the handle is clicked', () => {
      it('calls handleClickHandle', () => {
        const { handle } = renderApp({ gachaponState, capsules, screenState });

        fireEvent.click(handle);
        expect(handleClickHandle).toHaveBeenCalled();
      });
    });

    context('when the capsule is clicked', () => {
      it('calls handleClickCapsule', () => {
        const { handle, capsule } = renderApp({ gachaponState, capsules, screenState });

        fireEvent.click(handle);
        fireEvent.click(capsule);
        expect(handleClickCapsule).toHaveBeenCalled();
      });
    });
  });

  context('when the handle is spinning', () => {
    const gachaponState = 'spinning';
    const capsules = [];
    const screenState = '';

    it('does not show the coin', () => {
      const { coin } = renderApp({ gachaponState, capsules, screenState });

      expect(coin).toHaveStyleRule('top', '51.8vh');
    });
  });

  context('when three ideas have been revealed', () => {
    const gachaponState = 'reset';
    const capsules = [
      { id: 8, description: '평상시 안 입을 옷을 입고 부캐로 하루 보내기' },
      { id: 19, description: '짧은 손편지로 평상시 하지 못한 말 전하기' },
      { id: 5, description: '호캉스 떠나기' },
    ];
    const screenState = 'ideas';

    it('displays the date ideas on screen', () => {
      const { screen } = renderApp({ gachaponState, capsules, screenState });

      expect(screen).toHaveTextContent('호캉스 떠나기');
    });
  });
});
