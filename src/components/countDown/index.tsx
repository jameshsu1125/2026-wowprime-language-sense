import { TransitionType } from '@/settings/type';
import useCountdown from 'lesca-use-countdown';
import useTween from 'lesca-use-tween';
import { memo, useEffect } from 'react';

type CountDownProps = {
  selectedWeek: string;
  transition: TransitionType;
};

const CountDown = memo(({ selectedWeek, transition }: CountDownProps) => {
  const [date] = useCountdown(new Date(selectedWeek));
  const [days, hours, minutes, seconds] = date;

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ opacity: 1, y: 0 }, { duration: 600, delay: 500 });
    }
  }, [transition]);

  return (
    <div className='font-line-bold w-full text-center text-xl' style={style}>
      距離排名結算，倒數：{days}天{hours}時{minutes}分{seconds}秒
    </div>
  );
});
export default CountDown;
