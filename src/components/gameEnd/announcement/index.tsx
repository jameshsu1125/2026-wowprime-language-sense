import Button from '@/components/button';
import useRanking, { TRankingResponse } from '@/hooks/useRanking';
import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import './index.less';
import AnnouncementTable from './table';

const Text = memo(({ transition }: { transition: TransitionType }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 20 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500 });
    }
  }, [transition]);

  return (
    <div className='text' style={style}>
      <span>
        恭喜以下得獎者，
        <br />
        相關兌獎簡訊已發送到手機!
      </span>
      <br />
      請查收訊息依照步驟領獎，
      <br />
      逾期未完成視同放棄領獎唷！
    </div>
  );
});

const Dialog = memo(() => {
  const id = useId();

  const [response, getRanking] = useRanking();
  const [transition, setTransition] = useState(TransitionType.Unset);

  useEffect(() => {
    getRanking(true);
  }, []);

  useEffect(() => {
    if (response) {
      setTransition(TransitionType.FadeIn);
    }
  }, [response]);

  useEffect(() => {
    Click.addPreventExcept(`#${id}`);
  }, [id]);

  const rankingDate = (response?.rankingDate || []) as TRankingResponse['rankingDate'];

  return (
    <div id={id} className='dialog'>
      <Text transition={transition} />
      <AnnouncementTable rankingDate={rankingDate} transition={transition} />
    </div>
  );
});

const Announcement = memo(() => {
  const [, setContext] = useContext(Context);

  return (
    <div className='Announcement'>
      <div className='bg' />
      <div className='ctx'>
        <div className='content'>
          <div className='header'>
            得獎公告
            <Button
              className='back'
              onClick={() => {
                setContext({
                  type: ActionType.Playing,
                  state: {
                    openAnnouncement: false,
                    openMyAward: false,
                    openRanking: false,
                    openDescription: false,
                    openProcedures: false,
                  },
                });
              }}
            >
              <div />
            </Button>
          </div>
          <Dialog />
        </div>
      </div>
    </div>
  );
});
export default Announcement;
