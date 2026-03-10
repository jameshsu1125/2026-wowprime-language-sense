import Container from '@/components/container';
import { memo, useContext, useMemo, useState } from 'react';
import Landing from '../landing';
import { HomeContext, HomePageType, HomeState, HomeStepType, THomeState } from './config';
import Examiner from '../examiner';
import Game from '../game';
import OnloadProvider from 'lesca-react-onload';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<THomeState>(HomeState);

  const Page = useMemo(() => {
    const [target] = Object.values(HomePageType).filter((data) => data === state.page);

    switch (target) {
      default:
      case HomePageType.Landing:
        return <Landing />;

      case HomePageType.Examiner:
        return <Examiner />;

      case HomePageType.Game:
        return <Game />;
    }
  }, [state.page]);

  return (
    <OnloadProvider
      onload={() => {
        setState((S) => ({ ...S, step: HomeStepType.loaded }));
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      }}
    >
      <div>
        <HomeContext.Provider value={[state, setState]}>
          <Container className='Home'>{Page}</Container>
        </HomeContext.Provider>
      </div>
    </OnloadProvider>
  );
});

export default Home;
