import useTween, { Bezier } from 'lesca-use-tween';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import './note.less';

type NoteProps = {
  index: number;
  onEnd: (index: number) => void;
  onUpdate: (index: number, top: number) => void;
  onMiss: () => void;
};

const Note = forwardRef(({ index, onEnd, onUpdate, onMiss }: NoteProps, ref) => {
  const noteRef = useRef<HTMLDivElement>(null);
  const [style, setStyle, destroy] = useTween({
    top: '-5%',
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
  });

  const count = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return Math.floor(Math.random() * 3);
  }, []);

  useEffect(() => {
    setStyle(
      // { top: `${TaikoBullseye}%` },
      { top: '105%' },
      {
        duration: 4000,
        easing: Bezier.linear,
        onUpdate: (style: { top: number }) => {
          onUpdate(index, style.top);
        },
        onEnd: (style: { top: number }) => {
          onUpdate(index, style.top);
          onEnd(index);
          onMiss();
        },
      },
    );
    return () => {
      destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    get: () => {
      if (noteRef.current) {
        // noteRef.current.style.visibility = 'hidden';
        const degree = -135 + Math.random() * 90;
        const radius = 400;

        const x = radius * Math.cos((degree * Math.PI) / 180);
        const y = radius * Math.sin((degree * Math.PI) / 180);
        const rotate = -720 + Math.random() * 360;

        setStyle(
          { opacity: 0, scale: 0, x, y, rotate },
          {
            duration: 1200,
            onEnd: () => {
              onEnd(index);
            },
          },
        );
      }
    },
    stop: () => {
      destroy();
    },
  }));

  return (
    <div className='Note' style={style} ref={noteRef}>
      <div className={`symbols s${count}`} />
    </div>
  );
});
export default Note;
