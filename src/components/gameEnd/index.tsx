/* eslint-disable react-hooks/set-state-in-effect */
import { ResetContext } from '@/pages/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import Contain from '../contain';
import Announcement from './announcement';
import { GameEndContext, GameEndState, GameEndStepType } from './config';
import Description from './description';
import './index.less';
import EndLanding from './landing';
import MyAward from './myAward';
import Procedures from './procedures';
import Ranking from './ranking';
import EndResult from './result';
import frame from './result/img/frame.svg';

const BG = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, backgroundColor: '#000000' });

  useEffect(() => {
    setStyle({ opacity: 0.8, backgroundColor: '#000000' }, 200);
  }, []);
  return <div className='bg' style={style} />;
});

const GameEnd = memo(() => {
  const [context, setContext] = useContext(Context);
  const { openRanking, isEnd, openAnnouncement, openMyAward, openDescription, openProcedures } =
    context[ActionType.Playing]!;
  const menuState = context[ActionType.Menu]!;
  const [pageState, setPageState] = useState<
    'unset' | 'ranking' | 'announcement' | 'myAward' | 'description' | 'procedures'
  >('unset');

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
    if (openMyAward) {
      setPageState('myAward');
    }
  }, [openMyAward]);

  useEffect(() => {
    if (openDescription) {
      setPageState('description');
    }
  }, [openDescription]);

  useEffect(() => {
    if (openProcedures) {
      setPageState('procedures');
    }
  }, [openProcedures]);

  useEffect(() => {
    if (!openRanking && !openAnnouncement && !openMyAward && !openDescription && !openProcedures) {
      setPageState('unset');
    }
  }, [openRanking, openAnnouncement, openMyAward, openDescription, openProcedures]);

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
        return <Ranking />;

      case 'announcement':
        return <Announcement />;

      case 'myAward':
        return <MyAward />;

      case 'description':
        return <Description />;

      case 'procedures':
        return <Procedures />;

      default:
        return null;
    }
  }, [pageState]);

  useEffect(() => {
    if (pageState === 'ranking') {
      setContext({ type: ActionType.Playing, state: { openAnnouncement: false } });
    }

    if (pageState === 'announcement') {
      setContext({ type: ActionType.Playing, state: { openRanking: false } });
    }

    if (pageState === 'myAward') {
      setContext({ type: ActionType.Playing, state: { openRanking: false } });
    }

    if (pageState === 'description') {
      setContext({ type: ActionType.Playing, state: { openRanking: false } });
    }

    if (pageState === 'procedures') {
      setContext({ type: ActionType.Playing, state: { openRanking: false } });
    }
  }, [pageState, setContext]);

  return (
    <GameEndContext.Provider value={value}>
      <div className='GameEnd'>
        {!openRanking &&
          !openAnnouncement &&
          !openDescription &&
          !openProcedures &&
          (!menuState.enabled || isEnd) && <BG />}
        <div className='ctx'>
          <Contain imageURL={frame} IsHiddenDialogImage={true}>
            {page}
          </Contain>
        </div>
        {modalPage}
      </div>
    </GameEndContext.Provider>
  );
});
export default GameEnd;
