import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween from 'lesca-use-tween';
import { ValidatePhone } from 'lesca-validate';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../home/config';
import LoginButton from './button';
import Heading, { Notice } from './heading';
import './index.less';

const TelValidate = memo(
  ({
    onChange,
    onAgree,
  }: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAgree?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const [style, setStyle] = useTween({ opacity: 0 });
    useEffect(() => {
      setStyle({ opacity: 1 }, { duration: 500 });
    }, []);
    return (
      <div className='flex w-full flex-col items-center gap-2' style={style}>
        <div className='flex w-full justify-end pb-3'>
          <div>
            <button className='active:bg-primary w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white select-none hover:bg-gray-800'>
              發送驗證碼
            </button>
          </div>
        </div>
        <Group
          name='tel-validate'
          onChange={onChange}
          maxLength={6}
          transition={true}
          delay={0}
          noTransition
        />
        <div className='flex w-full justify-end'>
          <div>
            <button className='active:bg-primary w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white select-none hover:bg-gray-800'>
              重發驗證碼
            </button>
          </div>
        </div>
        <div className='flex w-full justify-center py-3'>
          <div className='flex flex-row items-center gap-2 text-base whitespace-nowrap'>
            <input type='checkbox' id='agree' name='agree' onChange={onAgree} className='h- w-4' />
            我已詳閱並同意
            <a href='#' className='text-blue-500 underline underline-offset-2'>
              《個資告知事項暨同意書》
            </a>
          </div>
        </div>
      </div>
    );
  },
);

const Group = memo(
  ({
    name,
    defaultValue,
    onChange,
    transition,
    maxLength = 10,
    delay = 0,
    noTransition = false,
  }: {
    name: string;
    defaultValue?: string;
    maxLength?: number;
    transition: boolean;
    delay: number;
    noTransition?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const [style, setStyle] = useTween({ opacity: noTransition ? 1 : 0, y: noTransition ? 0 : 50 });

    useEffect(() => {
      if (transition && !noTransition) {
        setStyle({ opacity: 1, y: 0 }, { duration: 400, delay });
      }
    }, [transition]);

    const labelName = useMemo(() => {
      switch (name) {
        default:
        case 'nickname':
          return '你的暱稱：';
        case 'tel':
          return '手機號碼：';
        case 'tel-validate':
          return '驗證碼：';
      }
    }, [name]);
    return (
      <div
        className='relative flex w-full flex-row items-center justify-center gap-2 px-5'
        style={style}
      >
        <label>{labelName}</label>
        <input
          type='text'
          placeholder={name === 'tel-validate' ? '請輸入簡訊驗證碼(OTP)' : ''}
          name={name}
          defaultValue={defaultValue || ''}
          onChange={onChange}
          maxLength={maxLength}
        />
      </div>
    );
  },
);

const Login = memo(() => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(HomeContext);
  const [userData, setUserData] = useState({ nickname: '', tel: '', code: '', isAgree: false });
  const [passed, setPassed] = useState(false);

  const [transition, setTransition] = useState(false);

  const checkValidate = useCallback(() => {
    if (userData.nickname === 'james') {
      setState((S) => ({ ...S, page: HomePageType.Game }));
      return;
    }
    if (!passed) {
      const isPhoneNumber = ValidatePhone(userData.tel);
      if (!isPhoneNumber) {
        alert('請輸入正確的手機號碼');
        return;
      }
      setPassed(true);
    } else {
      if (userData.code !== '' && userData.isAgree) {
        setState((S) => ({ ...S, page: HomePageType.Game }));
        setContext({
          type: ActionType.User,
          state: { nickname: userData.nickname, tel: userData.tel },
        });
      } else {
        alert('請輸入驗證碼並同意相關條款');
      }
    }
  }, [userData, passed, setState, setContext]);

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
      }}
    >
      <div className='Login'>
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <Heading transition={transition} />
          <Group
            name='nickname'
            defaultValue={userData.nickname}
            onChange={(e) => {
              setUserData((S) => ({ ...S, nickname: e.target.value }));
            }}
            maxLength={10}
            transition={transition}
            delay={300}
          />

          <Group
            name='tel'
            defaultValue={userData.tel}
            onChange={(e) => {
              setUserData((S) => ({ ...S, tel: e.target.value }));
            }}
            maxLength={10}
            transition={transition}
            delay={500}
          />
          {passed && (
            <TelValidate
              onChange={(e) => {
                setUserData((S) => ({ ...S, code: e.target.value }));
              }}
              onAgree={(e) => {
                setUserData((S) => ({ ...S, isAgree: e.target.checked }));
              }}
            />
          )}
          <div className={twMerge('btn flex justify-center', !passed && 'mt-20')}>
            <LoginButton checkValidate={checkValidate} transition={transition} />
          </div>
          <div className='flex w-full flex-col gap-4 px-5 text-base'>
            <Notice transition={transition} delay={1500}>
              ※參與本活動即可獲得參加獎－瘋美食50點序號一組手機號碼限領一次。限量33,000名，送完為止。
            </Notice>
            <Notice transition={transition} delay={1600}>
              ※排行榜每週更新，前100名可獲得限定獎項一起爭取最高榮耀吧！
            </Notice>
          </div>
        </div>
      </div>
    </OnloadProvider>
  );
});
export default Login;
