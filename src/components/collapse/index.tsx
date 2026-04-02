import { IReactProps } from '@/settings/type';
import { memo, useEffect, useId, useState } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';
import Click from 'lesca-click';

type CollapseType = IReactProps & { title?: string; head?: string; defaultOpen?: boolean };

const Collapse = memo(({ children, title, head, defaultOpen }: CollapseType) => {
  const id = useId();

  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      setOpen((prev) => !prev);
    });

    return () => Click.remove(`#${id}`);
  }, []);

  return (
    <div className='Collapse'>
      <div id={id} className='head'>
        <div className={twMerge(!title && 'flex-1')}>{head}</div>
        <div className={twMerge(title ? 'flex-1' : 'w-[20%]', open && 'open')}>{title}</div>
      </div>
      <div className={twMerge('body', open ? 'max-h-500' : 'max-h-0')}>
        <div className='w-full p-5'>{children}</div>
      </div>
    </div>
  );
});
export default Collapse;
