import Button from '@/components/button';
import Sounds from '@/components/sounds';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import CharTransition from 'lesca-react-char-transition';
import OnloadProvider from 'lesca-react-onload';
import useTween, { Bezier } from 'lesca-use-tween';
import { Fragment, memo, useContext, useEffect, useRef, useState } from 'react';
import { HomeContext, HomePageType } from '../home/config';
import './index.less';
import videoURL from './vid/video-cover.mp4';
import { subtitleSetting } from './config';

const NextButton = memo(({ transition }: { transition: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, x: -50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 500, easing: Bezier.outBack });
    }
  }, [transition]);

  const [, setState] = useContext(HomeContext);
  return (
    <div className='w-6/12' style={style}>
      <Button
        onClick={() => {
          setState((S) => ({ ...S, page: HomePageType.Login }));
        }}
      >
        <Button.rounded>
          <div className='btn-next'>
            <div />
          </div>
        </Button.rounded>
      </Button>
    </div>
  );
});

let delay = 0;

const Frame = memo(({ transition, isPlay }: { transition: boolean; isPlay: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500, easing: Bezier.outBack });
    }
  }, [transition]);

  useEffect(() => {
    delay = 0;
  }, []);

  return (
    <div className='frame' style={style}>
      <div>
        <div>
          <div className='subtitle'>
            {subtitleSetting.map((item, index) => {
              const duration = item.text.length * 40;
              // eslint-disable-next-line react-hooks/globals
              delay = index === 0 ? 0 : delay + item.delay + duration;
              return (
                <Fragment key={item.text}>
                  <CharTransition
                    duration={duration}
                    delay={delay}
                    list={['　']}
                    preChar='　'
                    fps={30}
                    easing={Bezier.linear}
                  >
                    {item.text}
                  </CharTransition>
                  <div className='w-2' />
                </Fragment>
              );
            })}
          </div>
          <div className='flex w-full justify-end'>
            <NextButton transition={transition} />
          </div>
        </div>
      </div>
    </div>
  );
});

const Examiner = memo(() => {
  const [, setContext] = useContext(Context);
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const videoElement = ref.current;
    if (videoElement) {
      videoElement.onplay = () => {
        setIsPlay(true);
      };
      videoElement.onpause = () => {
        setIsPlay(false);
      };
      videoElement.onended = () => {
        setIsPlay(false);
        if (videoElement) videoElement.currentTime = 0;
      };
    }
    return () => {
      if (videoElement) videoElement.pause();
    };
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        const tracks = new Sounds({
          onload: () => {
            setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
            setTransition(true);
          },
        });
        setContext({ type: ActionType.Sounds, state: { tracks } });
      }}
    >
      <div className='Examiner'>
        <div>
          <div className='video'>
            <div>
              <div>
                <div className='cover'>
                  <div className='video-player'>
                    <video ref={ref} className='h-full w-full' playsInline preload='auto'>
                      <source src={videoURL} type='video/mp4' />
                    </video>
                  </div>
                  {!isPlay && (
                    <button
                      className='play-button'
                      onClick={() => {
                        if (ref.current) {
                          ref.current.play();
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Frame transition={transition} isPlay={isPlay} />
          {transition && <div className='font-preloader' key='fonts' />}
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Examiner;
