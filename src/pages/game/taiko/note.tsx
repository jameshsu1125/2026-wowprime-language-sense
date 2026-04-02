import useTween, { Bezier } from 'lesca-use-tween';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { TaikoNoteSpeed } from './config';
import './note.less';

type NoteProps = {
  index: number;
  type: '0' | '1' | '2';
  onEnd: (index: number) => void;
  onUpdate: (index: number, top: number) => void;
  onMiss: () => void;
};

const Note = forwardRef(({ index, type, onEnd, onUpdate, onMiss }: NoteProps, ref) => {
  const noteRef = useRef<HTMLDivElement>(null);
  const [style, setStyle, destroy] = useTween({
    top: '-5%',
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
  });

  useEffect(() => {
    setStyle(
      { top: '105%' },
      {
        duration: TaikoNoteSpeed,
        easing: Bezier.linear,
        onUpdate: (style: { top: number }) => onUpdate(index, style.top),
        onEnd: (style: { top: number }) => {
          onUpdate(index, style.top);
          onEnd(index);
          onMiss();
        },
      },
    );
    return () => destroy();
  }, []);

  useImperativeHandle(ref, () => ({
    get: () => {
      if (noteRef.current) {
        const degree = -135 + Math.random() * 90;
        const radius = 400;

        const x = radius * Math.cos((degree * Math.PI) / 180);
        const y = radius * Math.sin((degree * Math.PI) / 180);
        const rotate = -720 + Math.random() * 360;

        setStyle(
          { opacity: 0, scale: 0, x, y, rotate },
          {
            duration: 1200,
            onEnd: () => onEnd(index),
          },
        );
      }
    },
    stop: () => destroy(),
  }));

  return (
    <div className='Note' style={style} ref={noteRef}>
      <div className={`symbols s${type}`} />
    </div>
  );
});
export default Note;
