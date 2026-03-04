import Container from '@/components/container';
import { lazy, memo, Suspense, useMemo, useState } from 'react';
import { HomeContext, HomePageType, HomeState, THomeState } from './config';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);

  const Page = useMemo(() => {
    const [target] = Object.values(HomePageType).filter((data) => data === state.page);
    if (target) {
      const Element = lazy(() => import(`..${target}/index.tsx`));
      return (
        <Suspense fallback=''>
          <Element />
        </Suspense>
      );
    }
    return null;
  }, [state.page]);

  return (
    <Container className='Home'>
      <HomeContext.Provider value={[state, setState]}>{Page}</HomeContext.Provider>
    </Container>
  );
});

export default Home;
