import Container from '@/components/container';
import { memo, useMemo, useState } from 'react';
import Landing from '../landing';
import { HomeContext, HomePageType, HomeState, THomeState } from './config';
import Examiner from '../examiner';
import Game from '../game';

const Home = memo(() => {
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
    <Container className='Home'>
      <HomeContext.Provider value={[state, setState]}>{Page}</HomeContext.Provider>
    </Container>
  );
});

export default Home;
