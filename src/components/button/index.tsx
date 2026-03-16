import { ActionType, IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import { useContext, useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import Large from './large';
import Rounded from './rounded';
import Skip from './skip';
import { Context } from '@/settings/constant';

type TRegularProps = IReactProps & {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, className, style, onClick, disabled }: TRegularProps) => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds];
  const id = useId();

  useEffect(() => {
    if (onClick)
      Click.add(`#${id}`, () => {
        onClick();
        if (sounds && sounds.tracks) {
          sounds.tracks.play('click', 0.3);
        }
      });
    return () => {
      if (onClick) Click.remove(`#${id}`);
    };
  }, [id, onClick, sounds]);

  return (
    <button
      id={id}
      disabled={disabled}
      className={twMerge('btn w-full cursor-pointer', className)}
      style={style}
    >
      {children}
    </button>
  );
};

Button.large = Large;
Button.rounded = Rounded;
Button.Skip = Skip;

export default Button;
