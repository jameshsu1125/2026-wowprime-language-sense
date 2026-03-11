import { memo, useMemo, useState } from 'react';
import { TaikoContext, TaikoState, TaikoStepType } from './config';
import './index.less';
import TaikoIntro from './intro';

const Taiko = memo(() => {
  const [state, setState] = useState(TaikoState);

  const page = useMemo(() => {
    switch (state.step) {
      case TaikoStepType.intro:
        return <TaikoIntro />;

      case TaikoStepType.game:
        return <div />;
    }
  }, [state.step]);

  return (
    <TaikoContext.Provider value={[state, setState]}>
      <div className='Taiko'>{page}</div>
    </TaikoContext.Provider>
  );
});
export default Taiko;
