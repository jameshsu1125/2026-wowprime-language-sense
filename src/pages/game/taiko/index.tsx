import { memo, useMemo, useState } from 'react';
import { TaikoContext, TaikoState, TaikoStepType } from './config';
import TaikoGame from './game';
import './index.less';
import TaikoIntro from './intro';

const Taiko = memo(() => {
  const [state, setState] = useState(TaikoState);

  const page = useMemo(() => {
    switch (state.step) {
      case TaikoStepType.intro:
        return <TaikoIntro />;

      case TaikoStepType.game:
        return <TaikoGame />;
    }
  }, [state.step]);

  return (
    <TaikoContext.Provider value={[state, setState]}>
      <div className='Taiko'>{page}</div>
      <div className='preloader fixed top-full'>
        <div />
        <div />
        <div />
      </div>
    </TaikoContext.Provider>
  );
});
export default Taiko;
