import Container from '@/components/container';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import Landing from '../landing';
import { HomeContext, HomePageType, HomeState, HomeStepType, THomeState } from './config';
import Examiner from '../examiner';
import Game from '../game';
import OnloadProvider from 'lesca-react-onload';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Login from '../login';
import { ResetContext } from '../config';
import Sounds from '@/components/sounds';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const value = useState<THomeState>(HomeState);
  const [reset] = useContext(ResetContext);

  useEffect(() => {
    if (reset.index) {
      value[1](HomeState);
      setContext({ type: ActionType.Playing, state: { enabled: false, isEnd: false, score: 0 } });
    }
  }, [reset.index]);

  const Page = useMemo(() => {
    const [target] = Object.values(HomePageType).filter((data) => data === value[0].page);

    switch (target) {
      default:
      case HomePageType.Landing:
        return <Landing />;

      case HomePageType.Examiner:
        return <Examiner />;

      case HomePageType.Login:
        return <Login />;

      case HomePageType.Game:
        return <Game />;
    }
  }, [value[0].page]);

  return (
    <OnloadProvider
      key={reset.index}
      hideBeforeLoaded={reset.index === 0 ? true : false}
      onload={() => {
        value[1]((S) => ({ ...S, step: HomeStepType.loaded }));
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        const tracks = new Sounds();
        setContext({ type: ActionType.Sounds, state: { tracks } });
      }}
    >
      <div>
        <HomeContext.Provider value={value}>
          <Container className='Home'>{Page}</Container>
        </HomeContext.Provider>
      </div>
    </OnloadProvider>
  );
});

export default Home;
