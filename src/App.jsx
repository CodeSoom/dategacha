import React, { useEffect, useState } from 'react';

import ideas from '../fixtures/ideas';

import Gachapon from './Gachapon';

export default function App() {
  const date = new Date();

  const initCapsules = () => {
    if (!localStorage.getItem('capsules')) {
      return [];
    }

    return JSON.parse(localStorage.getItem('capsules')).filter(
      (capsule) => capsule.date === date.toLocaleDateString(),
    );
  };

  const initialGachapon = initCapsules().length === 3 ? 'empty' : 'reset';
  const initialScreen = initCapsules().length > 0 ? 'ideas' : 'title';

  const [state, setState] = useState({
    gachapon: initialGachapon,
    capsules: initCapsules(),
    screen: initialScreen,
  });

  const { gachapon, capsules, screen } = state;

  useEffect(() => {
    localStorage.setItem('capsules', JSON.stringify(capsules));
  }, [capsules]);

  function handleChangeState(newState) {
    setState({
      ...state,
      ...newState,
    });
  }

  function handleClickHandle(event) {
    event.preventDefault();

    if (capsules && capsules.length === 3) {
      return;
    }

    handleChangeState({ gachapon: 'spinning' });

    setTimeout(() => {
      handleChangeState({ gachapon: 'spun' });
    }, 1400);
  }

  function handleClickCapsule(event) {
    event.preventDefault();

    if (capsules.length === 3) {
      return;
    }

    const idea = ideas[Math.floor(Math.random() * 30)];

    const newState = {
      0: {
        screen: 'ideas',
        capsules: [...capsules, { ...idea, date: date.toLocaleDateString() }],
        gachapon: 'reset',
      },
      1: {
        screen: 'ideas',
        capsules: [...capsules, { ...idea, date: date.toLocaleDateString() }],
        gachapon: 'reset',
      },
      2: {
        screen: 'ideas',
        capsules: [...capsules, { ...idea, date: date.toLocaleDateString() }],
        gachapon: 'empty',
      },
    };

    handleChangeState(newState[capsules.length]);
  }

  return (
    <Gachapon
      gachapon={gachapon}
      capsules={capsules}
      screen={screen}
      onClickHandle={handleClickHandle}
      onClickCapsule={handleClickCapsule}
    />
  );
}
