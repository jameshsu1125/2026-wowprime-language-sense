/* eslint-disable react-hooks/set-state-in-effect */
import { ResetContext } from '@/pages/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { GameEndContext, GameEndState, GameEndStepType } from './config';
import './index.less';
import EndLanding from './landing';
import Ranking from './ranking';
import EndResult from './result';
import Announcement from './announcement';

const BG = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, backgroundColor: '#000000' });

  useEffect(() => {
    setStyle({ opacity: 0.8, backgroundColor: '#000000' }, 200);
  }, []);
  return <div className='bg' style={style} />;
});

const GameEnd = memo(() => {
  const [context, setContext] = useContext(Context);
  const { openRanking, isEnd, openAnnouncement } = context[ActionType.Playing]!;
  const menuState = context[ActionType.Menu]!;
  const [pageState, setPageState] = useState<'unset' | 'ranking' | 'announcement'>('unset');

  const value = useState(GameEndState);
  const [reset] = useContext(ResetContext);

  useEffect(() => {
    if (reset.index) value[1](GameEndState);
  }, [reset.index]);

  useEffect(() => {
    if (openRanking) {
      setPageState('ranking');
    }
  }, [openRanking]);

  useEffect(() => {
    if (openAnnouncement) {
      setPageState('announcement');
    }
  }, [openAnnouncement]);

  useEffect(() => {
    if (!openRanking && !openAnnouncement) {
      setPageState('unset');
    }
  }, [openRanking, openAnnouncement]);

  useEffect(() => {
    if (isEnd) {
      value[1]((S) => ({ ...S, step: GameEndStepType.landing }));
    }
  }, [isEnd]);

  const page = useMemo(() => {
    switch (value[0].step) {
      case GameEndStepType.landing:
        return <EndLanding />;

      case GameEndStepType.result:
        return <EndResult />;

      default:
        return null;
    }
  }, [value[0].step]);

  const modalPage = useMemo(() => {
    switch (pageState) {
      case 'ranking':
        setContext({ type: ActionType.Playing, state: { openAnnouncement: false } });
        return <Ranking />;

      case 'announcement':
        setContext({ type: ActionType.Playing, state: { openRanking: false } });
        return <Announcement />;

      default:
        return null;
    }
  }, [pageState]);

  return (
    <GameEndContext.Provider value={value}>
      <div className='GameEnd'>
        {!openRanking && !openAnnouncement && (!menuState.enabled || isEnd) && <BG />}
        <div className='ctx'>{page}</div>
        {modalPage}
      </div>
    </GameEndContext.Provider>
  );
});
export default GameEnd;
