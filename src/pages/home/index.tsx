import { memo, useState } from 'react';
import { HomeContext, HomeState, THomeState } from './config';
import './index.less';
import Container from '@/components/container';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);

  return (
    <Container className='Home'>
      <HomeContext.Provider value={[state, setState]}>
        <div />
        adas
      </HomeContext.Provider>
    </Container>
  );
});

export default Home;
