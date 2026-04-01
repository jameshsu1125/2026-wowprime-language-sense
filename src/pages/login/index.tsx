/* eslint-disable react-hooks/set-state-in-effect */
import useLogin from '@/hooks/useLogin';
import useVerify from '@/hooks/useVerify';
import { EXCLUDED_CHARACTERS } from '@/settings/character';
import { IS_TEST, LOGIN_SECTION_DURATION, SMS_RESEND_DURATION } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Fetcher from 'lesca-fetcher';
import Storage from 'lesca-local-storage';
import OnloadProvider from 'lesca-react-onload';
import useTween, { Bezier } from 'lesca-use-tween';
import { ValidatePhone } from 'lesca-validate';
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDebounce } from 'use-debounce';
import { HomeContext, HomePageType } from '../home/config';
import LoginButton from './button';
import Heading, { Notice } from './heading';
import './index.less';

type TLoginButtonProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgree?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResend: () => void;
};

const ResendButton = memo(({ onClick }: { onClick: () => void }) => {
  const [count, setCount] = useTween({ top: 300 });
  const [resendTime, setResendTime] = useState(0);

  const currentDuration = useMemo(() => {
    if (resendTime < 2) return SMS_RESEND_DURATION.relaxed;
    return SMS_RESEND_DURATION.strict;
  }, [resendTime]);

  useEffect(() => {
    setCount({ top: 0 }, { duration: currentDuration, easing: Bezier.linear });
  }, [currentDuration]);

  return (
    <div className='mt-[4%] flex w-full justify-end'>
      <div>
        <button
          onClick={() => {
            if (Math.floor(Number(count.top)) === 0) {
              onClick();
              setResendTime((prev) => prev + 1);
              setCount({ top: 300 }, { duration: currentDuration, easing: Bezier.linear });
            }
          }}
          disabled={Math.floor(Number(count.top)) > 0}
          className='active:bg-primary w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-lg text-white select-none hover:bg-gray-800 md:text-lg'
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
      <div className='flex w-full justify-center py-2'>
        <div className='flex flex-row items-center gap-2 text-base whitespace-nowrap md:text-base'>
          <input type='checkbox' id='agree' name='agree' onChange={onAgree} className='h-8 w-8' />
          我已詳閱並同意
          <a
            href='https://www.wowfms.com/privacy.php'
            target='_blank'
            rel='noreferrer'
            className='text-blue-500 underline underline-offset-2'
          >
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
  shouldExcludeCharacters?: boolean;
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
    shouldExcludeCharacters = false,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useTween({ opacity: noTransition ? 1 : 0, y: noTransition ? 0 : 50 });
  const [text, setText] = useState(defaultValue || '');
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    if (!shouldExcludeCharacters) return;
    if (inputRef.current) {
      const currentValue = EXCLUDED_CHARACTERS.reduce((acc, cur) => acc.split(cur).join(''), value);
      inputRef.current.value = currentValue;
    }
  }, [value]);

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
        return '　驗證碼：';
    }
  }, [name]);
  return (
    <div
      className='relative flex w-full flex-row items-center justify-center gap-[3%] px-[2%]'
      style={style}
    >
      <div className='w-fit'>
        <label>{labelName}</label>
      </div>
      <div className='flex-1'>
        <input
          ref={inputRef}
          type={type}
          placeholder={name === 'otp' ? '請輸入簡訊驗證碼(OTP)' : ''}
          name={name}
          defaultValue={defaultValue || ''}
          onChange={(e) => {
            onChange?.(e);
            if (shouldExcludeCharacters) {
              setText(e.target.value);
            }
          }}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
});

const Login = memo(() => {
  const [, setContext] = useContext(Context);
  const [, setState] = useContext(HomeContext);

  const [userData, setUserData] = useState({ nickname: '', phone: '', otp: '', isAgree: false });
  const [passed, setPassed] = useState(false);
  const [transition, setTransition] = useState(false);

  const [loginRes, login] = useLogin();
  const [verifyRes, verify] = useVerify();

  useEffect(() => {
    if (verifyRes) {
      if (verifyRes.status === 'success' && verifyRes.message === '註冊與驗證成功！') {
        setState((S) => ({ ...S, page: HomePageType.Game }));
        const token = verifyRes.token || '';
        const { nickname, phone } = userData;
        Fetcher.setJWT(token);
        setContext({ type: ActionType.User, state: { nickname, phone, token } });
        Storage.set('token', { token, nickname, phone });
      }
      if (verifyRes.status === 'error') {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '系統訊息',
            content: verifyRes.message || '驗證失敗，請重新輸入驗證碼，請查閱手機簡訊',
            Label: ['確定'],
          },
        });
      }
    }
  }, [verifyRes]);

  useEffect(() => {
    if (loginRes) {
      if (loginRes.status === 'needsVerification') {
        setPassed(true);
        setState((S) => ({ ...S, isFirstVisit: true }));
      } else if (loginRes.status === 'success') {
        const token = loginRes.token || '';
        const { nickname, phone } = userData;
        Fetcher.setJWT(token);
        setContext({ type: ActionType.User, state: { nickname, phone, token } });
        Storage.set('token', { token, nickname, phone });
        setState((S) => ({ ...S, page: HomePageType.Game }));
      } else if (
        loginRes.status === 'error' &&
        decodeURIComponent(loginRes.message) === '手機號碼與暱稱不符'
      ) {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '系統訊息',
            content: (
              <>
                手機號碼與暱稱不符
                <br />
                *可查閱先前收到之驗證碼簡訊，確認所登記的暱稱
              </>
            ),
            Label: ['確定'],
          },
        });
      } else {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '系統訊息',
            content: loginRes.message,
            Label: ['確定'],
          },
        });
      }
    }
  }, [loginRes]);

  const checkValidate = useCallback(() => {
    if (!passed) {
      const isPhoneNumber = ValidatePhone(userData.phone);
      if (!isPhoneNumber) {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '系統訊息',
            content: '請輸入正確的手機號碼',
            Label: ['確定'],
          },
        });
        return;
      }
      const hasExcludedCharacter = EXCLUDED_CHARACTERS.some((char) =>
        userData.nickname.includes(char),
      );
      if (hasExcludedCharacter) {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '系統訊息',
            content: '暱稱包含敏感詞，請重新輸入',
            Label: ['確定'],
          },
        });
        return;
      }
      login(userData);
    } else {
      if (userData.otp !== '' && userData.isAgree) {
        verify(userData);
      } else {
        setContext({
          type: ActionType.Modal,
          state: {
            enabled: true,
            title: '系統訊息',
            content: '請輸入驗證碼並同意相關條款',
            Label: ['確定'],
          },
        });
      }
    }
  }, [userData, passed, setState, setContext, login, verify]);

  useEffect(() => {
    const storage = Storage.get('token');
    if (storage) {
      const { data, timestamp } = storage;
      const isValid = data && timestamp < LOGIN_SECTION_DURATION;

      if (isValid) {
        const { nickname, phone, token } = data;
        Fetcher.setJWT(token);
        setContext({
          type: ActionType.User,
          state: { nickname, phone, token },
        });

        // TODO: test
        if (IS_TEST) {
          const isGotoEnd = true;
          if (isGotoEnd) {
            setContext({
              type: ActionType.Playing,
              state: { enabled: true, score: 1000, isEnd: true, openRanking: false },
            });
          } else setState((S) => ({ ...S, page: HomePageType.Game }));
        } else {
          setState((S) => ({ ...S, page: HomePageType.Game }));
        }
      }
    }
  }, []);

  return (
    <OnloadProvider
      onload={() => {
        setTransition(true);
      }}
    >
      <div className='Login'>
        <div className='flex w-full flex-col items-center justify-center gap-2'>
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
            shouldExcludeCharacters
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
          <div className='flex w-full flex-col gap-2 text-sm md:text-sm'>
            <Notice transition={transition} delay={1500}>
              ※參與本活動即可獲得參加獎－瘋美食點數50點(1點=1元)一組手機號碼限領一次。限量33,000名，送完為止。
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
