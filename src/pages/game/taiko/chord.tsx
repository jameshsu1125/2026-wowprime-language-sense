import { SoundName } from '@/components/sounds/type';
import { HomeContext } from '@/pages/home/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import './chord.less';
import { TaikoBullseye, TaikoContext, TaikoTolerance } from './config';
import Hole from './hole';
import Metronome from './metronome';
import Note from './note';

type Meter = {
  direction: 'left' | 'right' | 'middle';
  index: number;
  top: number;
  isHit: boolean;
  type: '0' | '1' | '2';
};

const TypeSequence = ['0', '1', '1', '2'] as Meter['type'][];

const Chord = memo(() => {
  const [context, setContext] = useContext(Context);
  const { tracks } = context[ActionType.Sounds]!;

  const [, setHomeState] = useContext(HomeContext);

  const [state, setState] = useContext(TaikoContext);
  const noteRefs = useRef<any[]>([]);
  const scoreRef = useRef(0);
  const btnRefs = useRef<{ right: any; middle: any; left: any }>({
    right: null,
    middle: null,
    left: null,
  });

  const [meter, setMeter] = useState<Meter[]>([]);
  const meterRef = useRef<Meter[]>([]);
  const [count, setCount] = useState(0);

  const onEnd = (index: number) => {
    setMeter((S) => S.filter((m) => m.index !== index));
  };

  const onMiss = () => {
    tracks?.play('miss');
    setState((S) => ({ ...S, heart: S.heart - 1 }));
  };

  const onFire = () => {
    setCount((S) => S + 1);
  };

  const onLevelUp = () => {
    tracks?.play('levelup');
    setHomeState((S) => ({ ...S, level: S.level + 1 }));
  };

  useEffect(() => {
    if (count > 0) {
      setMeter((S) => [
        ...S,
        {
          direction: ['left', 'middle', 'right'].sort(
            () => Math.random() - 0.5,
          )[0] as Meter['direction'],
          index: count,
          top: -5,
          type: TypeSequence[(count - 1) % TypeSequence.length],
          isHit: false,
        },
      ]);
    }
  }, [count]);

  useEffect(() => {
    const metronome = new Metronome({ onFire, onLevelUp });
    EnterFrame.add(({ delta }) => {
      metronome.tick(delta);
    });
    EnterFrame.play();
  }, []);

  const onClick = useCallback(
    (direct: 'left' | 'middle' | 'right') => {
      [...meterRef.current]
        .filter((m) => m.direction === direct)
        .filter((m) => !m.isHit)
        .filter((_, idx) => idx === 0)
        .forEach((m) => {
          const distance = Math.abs(m.top - TaikoBullseye);
          if (distance < TaikoTolerance) {
            const score = Math.ceil(Math.max(1, TaikoTolerance - distance));
            noteRefs.current[m.index].get();
            btnRefs.current[direct].get();
            scoreRef.current += score;
            m.isHit = true;
            btnRefs.current[direct].score(score);
            setContext({ type: ActionType.Playing, state: { score: scoreRef.current } });
            const soundsType =
              m.type === '0' ? 'yiqi' : m.type === '1' ? 'hao' : ('chi' as SoundName);
            tracks?.play(soundsType, 1);
          } else {
            btnRefs.current[direct].miss();
          }
        });
    },
    [setContext, tracks],
  );

  const onUpdate = useCallback((index: number, top: number) => {
    setMeter((S) => {
      const dat = [...S].map((m) => {
        if (m.index === index) {
          return { ...m, top };
        }
        return m;
      });
      meterRef.current = dat;
      return dat;
    });
  }, []);

  useEffect(() => {
    // TODO => END
    if (state.heart <= 0) {
      EnterFrame.stop();
      EnterFrame.reset();
      EnterFrame.destroy();
      noteRefs.current.forEach((note) => {
        if (note) note.stop();
      });
      setContext({ type: ActionType.Playing, state: { isEnd: true } });
    }
  }, [state.heart]);

  return (
    <div className='Chord'>
      <div>
        <div className='string'>
          <div className='sound-hole'>
            <Hole
              onClick={onClick}
              direct='left'
              ref={(ref) => {
                if (ref) btnRefs.current.left = ref;
              }}
            />
          </div>
          {meter
            .filter((m) => m.direction === 'left')
            .reverse()
            .map((m) => (
              <Note
                type={m.type}
                key={m.index}
                index={m.index}
                onEnd={onEnd}
                onUpdate={onUpdate}
                onMiss={onMiss}
                ref={(ref) => {
                  if (ref) noteRefs.current[m.index] = ref;
                }}
              />
            ))}
        </div>
        <div className='string'>
          <div className='sound-hole'>
            <Hole
              onClick={onClick}
              direct='middle'
              ref={(ref) => {
                if (ref) btnRefs.current.middle = ref;
              }}
            />
          </div>
          {meter
            .filter((m) => m.direction === 'middle')
            .reverse()
            .map((m) => (
              <Note
                type={m.type}
                key={m.index}
                index={m.index}
                onEnd={onEnd}
                onUpdate={onUpdate}
                onMiss={onMiss}
                ref={(ref) => {
                  if (ref) noteRefs.current[m.index] = ref;
                }}
              />
            ))}
        </div>
        <div className='string'>
          <div className='sound-hole'>
            <Hole
              onClick={onClick}
              direct='right'
              ref={(ref) => {
                if (ref) btnRefs.current.right = ref;
              }}
            />
          </div>
          {meter
            .filter((m) => m.direction === 'right')
            .reverse()
            .map((m) => (
              <Note
                type={m.type}
                key={m.index}
                index={m.index}
                onEnd={onEnd}
                onUpdate={onUpdate}
                onMiss={onMiss}
                ref={(ref) => {
                  if (ref) noteRefs.current[m.index] = ref;
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
});
export default Chord;
