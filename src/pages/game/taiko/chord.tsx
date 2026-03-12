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
};

const Chord = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useContext(TaikoContext);
  const noteRefs = useRef<any[]>([]);
  const scoreRef = useRef(0);
  const btnRefs = useRef<{ right: any; middle: any; left: any }>({
    right: null,
    middle: null,
    left: null,
  });

  const [meter, setMeter] = useState<Meter[]>([]);
  const [count, setCount] = useState(0);

  const onEnd = (index: number) => {
    setMeter((S) => S.filter((m) => m.index !== index));
  };

  const onMiss = () => {
    setState((S) => ({ ...S, heart: S.heart - 1 }));
  };

  const onFire = () => {
    setCount((S) => S + 1);
  };

  useEffect(() => {
    if (count > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMeter((S) => [
        ...S,
        {
          direction: ['left', 'middle', 'right'].sort(
            () => Math.random() - 0.5,
          )[0] as Meter['direction'],
          index: count,
          top: -5,
        },
      ]);
    }
  }, [count]);

  useEffect(() => {
    const metronome = new Metronome({ onFire });
    EnterFrame.add(({ delta }) => {
      metronome.tick(delta);
    });
    EnterFrame.play();
  }, []);

  const onClick = useCallback(
    (direct: 'left' | 'middle' | 'right') => {
      setMeter((S) => {
        [...S]
          .filter((m) => m.direction === direct)
          .forEach((m) => {
            const distance = Math.abs(m.top - TaikoBullseye);
            if (distance < TaikoTolerance) {
              // HIT
              noteRefs.current[m.index].get();
              btnRefs.current[direct].get();
              scoreRef.current += distance;
              setContext({ type: ActionType.Playing, state: { score: scoreRef.current } });
            }
          });

        return S;
      });
    },
    [setContext],
  );

  const onUpdate = useCallback((index: number, top: number) => {
    setMeter((S) => {
      return [...S].map((m) => {
        if (m.index === index) {
          return { ...m, top };
        }
        return m;
      });
    });
  }, []);

  useEffect(() => {
    if (state.heart <= 0) {
      EnterFrame.stop();
      noteRefs.current.forEach((note) => {
        if (note) {
          note.stop();
        }
      });
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
            .map((m) => (
              <Note
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
            .map((m) => (
              <Note
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
            .map((m) => (
              <Note
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
