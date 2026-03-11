import { memo, useEffect } from 'react';
import './index.less';
import Button from '@/components/button';
import useTween from 'lesca-use-tween';

const LoginButton = memo(
  ({ checkValidate, transition }: { transition: boolean; checkValidate: () => void }) => {
    const [style, setStyle] = useTween({ opacity: 0, y: 50 });

    useEffect(() => {
      if (transition) {
        setStyle({ opacity: 1, y: 0 }, { duration: 400, delay: 1000 });
      }
    }, [transition]);

    return (
      <div className='w-7/12' style={style}>
        <Button onClick={checkValidate}>
          <Button.large>
            <div className='btn-start' />
          </Button.large>
        </Button>
      </div>
    );
  },
);
export default LoginButton;
