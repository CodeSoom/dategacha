import React, { useState } from 'react';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import ideas from '../fixtures/ideas';

const MoveUpDown = keyframes`
  0%, 100% {
    top: 51.8vh;
  }

  50% {
    top: 44vh;
  }
`;

const Spin = keyframes`
  0% {
    -webkit-transform: rotate(45deg);
    transform:rotate(45deg);
  }

  100% {
    -webkit-transform: rotate(405deg);
    transform:rotate(405deg);
  }
`;

const Appear = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const Shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const Blink = keyframes`
  50% { opacity: 0 }
`;

const Container = styled.div({
  width: '100%',
  fontFamily: 'Stylish, sans-serif',
});

const Machine = styled.img({
  position: 'fixed',
  left: '50%',
  bottom: 0,
  height: '80vh',
  transform: 'translateX(-50%)',
});

const ComponentsContainer = styled.div({
  position: 'fixed',
  left: '50%',
  bottom: 0,
  width: '39vh',
  height: '80vh',
  transform: 'translateX(-50%)',
});

const Screen = styled.div({
  position: 'absolute',
  left: '4.6vh',
  top: '5.1vh',
  width: '29.8vh',
  height: '41vh',
  overflow: 'hidden',
  '&.ideas img': {
    top: '-41vh',
    transition: 'top 0.2s ease-in-out',
  },
  '&.ideas ul': {
    opacity: 1,
    transition: 'opacity 0.3s 0.4s ease-in',
  },
});

const Logo = styled.img({
  position: 'absolute',
  top: '1.8vh',
  width: '29.8vh',
});

const Ideas = styled.ul({
  opacity: 0,
  position: 'relative',
  margin: 0,
  padding: '3vh 1.8vh 2vh',
  listStyle: 'none',
  textAlign: 'center',
  '& li': {
    marginBottom: '1.2vh',
    wordBreak: 'keep-all',
    fontSize: '2.8vh',
    color: '#fcd2c2',
  },
});

const CallToAction = styled.p({
  display: 'none',
  position: 'absolute',
  bottom: '1vh',
  left: '50%',
  margin: 0,
  width: '100%',
  fontSize: '3.6vh',
  textAlign: 'center',
  color: '#fff',
  transform: 'translateX(-50%)',
  '&.empty': {
    display: 'block',
    animation: `${Blink} 1.6s linear 2`,
  },
});

const Coin = styled.div({
  opacity: 0,
  position: 'relative',
  top: '51.8vh',
  left: '26.4vh',
  width: '5vh',
  height: '5vh',
  borderRadius: '50%',
  backgroundColor: '#f6dc62',
  '&.reset': {
    opacity: 1,
    transition: 'opacity 0.4s',
    animation: `${MoveUpDown} 1.2s linear infinite`,
  },
  '&.spinning': {
    opacity: 0,
    top: '51.8vh',
    left: '26.8vh',
    transition: 'top 0.2s 0.0s, left 0.1s 0.2s, opacity 0.2s 0.2s',
  },
  '&.empty': {
    opacity: 0,
  },
  '& div': {
    position: 'relative',
    top: '0.5vh',
    left: '0.5vh',
    width: '4vh',
    height: '4vh',
    border: '2px solid #febf4d',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
});

const CoinCover = styled.div({
  position: 'relative',
  top: '49.9vh',
  left: '25vh',
  width: '8vh',
  height: '2vh',
  backgroundColor: '#dff0fa',
});

const Handle = styled.div({
  position: 'absolute',
  top: '55.5vh',
  left: '27.9vh',
  width: '2.1vh',
  height: '8vh',
  border: '0',
  borderRadius: '0.5vh',
  backgroundColor: '#fff',
  transform: 'rotate(45deg)',
  outline: 'none',
  cursor: 'pointer',
  '&.spinning': {
    pointerEvents: 'none',
    animation: `${Spin} 1s ease-out`,
    animationDelay: '0.2s',
  },
  '&.spun': {
    pointerEvents: 'none',
  },
  '&.empty': {
    cursor: 'default',
  },
});

const Capsule = styled.img({
  display: 'none',
  position: 'absolute',
  top: '62.8vh',
  left: '6.68vh',
  width: '12vh',
  outline: 'none',
  cursor: 'pointer',
  '&.spinning': {
    display: 'block',
    opacity: 0,
    pointerEvents: 'none',
    animation: `${Appear} 0.4s ease-in`,
    animationDelay: '1s',
  },
  '&.spun': {
    display: 'block',
    opacity: 1,
    animation: `${Shake} 0.4s ease-in-out infinite`,
  },
  '&.empty': {
    display: 'none',
  },
});

const CapsuleCover = styled.div({
  position: 'absolute',
  top: '71.62vh',
  left: '5.8vh',
  width: '13.6vh',
  height: '1.3vh',
  backgroundColor: '#fcd2c2',
});

export default function Gachapon() {
  const date = new Date();
  const [capsules, setCapsules] = useLocalStorage('capsules', () => (localStorage.getItem('capsules') ? JSON.parse(localStorage.getItem('capsules')).filter((capsule) => capsule.date === date.toLocaleDateString())
    : []));

  const [state, setState] = useState(capsules.length === 3 ? 'empty' : 'reset');
  const [screen, setScreen] = useState(capsules.length > 0 ? 'ideas' : 'title');

  function handleClickHandle(event) {
    event.preventDefault();

    if (capsules && capsules.length === 3) {
      return;
    }

    setState('spinning');

    setTimeout(() => {
      setState('spun');
    }, 1400);
  }

  function handleClickCapsule(event) {
    event.preventDefault();

    if (capsules.length === 3) {
      return;
    }

    const idea = ideas[Math.floor(Math.random() * 30)];

    if (capsules.length === 0) {
      setScreen('ideas');
    }

    setCapsules(
      [...capsules, { ...idea, date: date.toLocaleDateString() }],
    );

    if (capsules.length === 2) {
      setState('empty');
    } else {
      setState('reset');
    }
  }

  return (
    <Container>
      <Machine
        srcSet="../assets/gachapon.png 480w,
             ../assets/gachapon@4x.png 800w"
        sizes="(max-width: 600px) 480px,
            800px"
        src="../assets/gachapon.png"
        alt="데잇가챠"
      />
      <ComponentsContainer>
        <Screen className={screen}>
          <Logo
            srcSet="../assets/dategacha.png 480w,
            ../assets/dategacha@4x.png 800w"
            sizes="(max-width: 600px) 480px,
           800px"
            src="../assets/dategacha.png"
            alt="로고"
          />
          <Ideas>
            { capsules.map((idea) => <li>{idea.description}</li>) }
          </Ideas>
          <CallToAction className={state}>하나 골라서 고고고!</CallToAction>
        </Screen>
        <Coin
          data-testid="coin"
          className={state}
        >
          <div />
        </Coin>
        <CoinCover />
        <Handle
          data-testid="handle"
          className={state}
          onClick={handleClickHandle}
          tabIndex="0"
        />
        <Capsule
          data-testid="capsule"
          className={state}
          onClick={handleClickCapsule}
          srcSet="../assets/capsule.png 480w,
             ../assets/capsule@4x.png 800w"
          sizes="(max-width: 600px) 480px,
            800px"
          src="../assets/capsule.png"
          alt="캡슐"
          tabIndex="0"
        />
        <CapsuleCover />
      </ComponentsContainer>
    </Container>
  );
}
