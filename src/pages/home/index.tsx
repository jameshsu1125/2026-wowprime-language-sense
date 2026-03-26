import Container from '@/components/container';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { ResetContext } from '../config';
import Examiner from '../examiner';
import Game from '../game';
import Landing from '../landing';
import Login from '../login';
import { HomeContext, HomePageType, HomeState, HomeStepType, THomeState } from './config';
import Click from 'lesca-click';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const value = useState<THomeState>(HomeState);
  const [reset] = useContext(ResetContext);

  useEffect(() => {
    const { index, navto } = reset;
    if (index > 0) {
      if (navto === 'home') value[1]({ ...HomeState, page: HomePageType.Examiner });
      else value[1]({ ...HomeState, page: HomePageType.Game });

      setContext({
        type: ActionType.Playing,
        state: {
          enabled: false,
          isEnd: false,
          score: 0,
          openRanking: false,
          openAnnouncement: false,
        },
      });

      setContext({
        type: ActionType.User,
        state: { nickname: '', phone: '', token: '' },
      });
    }
  }, [reset]);

  const Page = useMemo(() => {
    if (!value[0].page) return null;

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

  useEffect(() => {
    const checkMobileZoom = () => {
      if (window.innerWidth / window.devicePixelRatio !== window.innerWidth) {
        Click.setPreventDefault(true);
      } else {
        Click.setPreventDefault(false);
      }
    };

    checkMobileZoom();
    window.addEventListener('resize', checkMobileZoom);

    return () => window.removeEventListener('resize', checkMobileZoom);
  }, []);

  return (
    <OnloadProvider
      key={reset.index}
      hideBeforeLoaded={reset.index === 0 ? true : false}
      onload={() => {
        value[1]((S) => ({ ...S, step: HomeStepType.loaded }));
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
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
