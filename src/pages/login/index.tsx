/* eslint-disable react-hooks/set-state-in-effect */
import useLogin from '@/hooks/useLogin';
import useVerify from '@/hooks/useVerify';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import useTween, { Bezier } from 'lesca-use-tween';
import { ValidatePhone } from 'lesca-validate';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../home/config';
import LoginButton from './button';
import Heading, { Notice } from './heading';
import './index.less';
import Click from 'lesca-click';

Click.addPreventExcept('#input');

type TLoginButtonProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgree?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResend: () => void;
};

const ResendButton = memo(({ onClick }: { onClick: () => void }) => {
  const [count, setCount] = useTween({ top: 300 });

  useEffect(() => {
    setCount({ top: 0 }, { duration: 300000, easing: Bezier.linear });
  }, []);

  return (
    <div className='flex w-full justify-end'>
      <div>
        <button
          onClick={() => {
            if (Math.floor(Number(count.top)) === 0) {
              onClick();
            }
          }}
          disabled={Math.floor(Number(count.top)) > 0}
          className='active:bg-primary w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white select-none hover:bg-gray-800'
        >
          重發驗證碼
          {`(${Math.floor(Number(count.top))})`}
        </button>
      </div>
    </div>
  );
});

const TelValidate = memo(({ onChange, onAgree, onResend }: TLoginButtonProps) => {
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    setStyle({ opacity: 1 }, { duration: 500 });
  }, []);

  return (
    <div className='flex w-full flex-col items-center gap-2' style={style}>
      <Group
        name='otp'
        onChange={onChange}
        maxLength={6}
        transition={true}
        delay={0}
        noTransition
        type='tel'
      />
      <ResendButton onClick={onResend} />
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
});

type TGroupProps = {
  type: string;
  name: string;
  defaultValue?: string;
  maxLength?: number;
  transition: boolean;
  delay: number;
  noTransition?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Group = memo((props: TGroupProps) => {
  const {
    name,
    defaultValue,
    onChange,
    transition,
    type = 'text',
    maxLength = 10,
    delay = 0,
    noTransition = false,
  } = props;

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
      case 'phone':
        return '手機號碼：';
      case 'otp':
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
        id='input'
        type={type}
        placeholder={name === 'otp' ? '請輸入簡訊驗證碼(OTP)' : ''}
        name={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
});

const Login = memo(() => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(HomeContext);
  const [userData, setUserData] = useState({ nickname: '', phone: '', otp: '', isAgree: false });
  const [passed, setPassed] = useState(false);
  const [loginRes, login] = useLogin();
  const [verifyRes, verify] = useVerify();

  const [transition, setTransition] = useState(false);

  useEffect(() => {
    if (verifyRes) {
      if (verifyRes.status === 'success' && verifyRes.message === '註冊與驗證成功！') {
        setState((S) => ({ ...S, page: HomePageType.Game }));
        setContext({
          type: ActionType.User,
          state: {
            nickname: userData.nickname,
            phone: userData.phone,
            token: verifyRes.token || '',
          },
        });
      }
      if (verifyRes.status === 'error') {
        alert(verifyRes.message || '驗證失敗，請重新輸入驗證碼，請查閱手機簡訊');
      }
      console.log(verifyRes);
    }
  }, [verifyRes]);

  useEffect(() => {
    if (loginRes) {
      if (loginRes.status === 'needsVerification') {
        alert('請輸入簡訊驗證碼，請查閱手機簡訊');
        setPassed(true);
      } else if (loginRes.status === 'success') {
        setState((S) => ({ ...S, page: HomePageType.Game }));
        setContext({
          type: ActionType.User,
          state: {
            nickname: userData.nickname,
            phone: userData.phone,
            token: loginRes.token || '',
          },
        });
      } else {
        alert(loginRes.message);
      }
    }
  }, [loginRes]);

  const checkValidate = useCallback(() => {
    if (!passed) {
      const isPhoneNumber = ValidatePhone(userData.phone);
      if (!isPhoneNumber) {
        alert('請輸入正確的手機號碼');
        return;
      }
      login(userData);
    } else {
      if (userData.otp !== '' && userData.isAgree) {
        verify(userData);
      } else {
        alert('請輸入驗證碼並同意相關條款');
      }
    }
  }, [userData, passed, setState, setContext, login, verify]);

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
            type='text'
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
            type='tel'
            name='phone'
            defaultValue={userData.phone}
            onChange={(e) => {
              setUserData((S) => ({ ...S, phone: e.target.value }));
            }}
            maxLength={10}
            transition={transition}
            delay={500}
          />
          {passed && (
            <TelValidate
              onResend={() => {
                login(userData);
              }}
              onChange={(e) => {
                setUserData((S) => ({ ...S, otp: e.target.value }));
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
