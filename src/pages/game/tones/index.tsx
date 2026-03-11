import { memo, useMemo, useState } from 'react';
import { TonesContext, TonesState, TonesStepType } from './config';
import './index.less';
import TonesIntro from './intro';
import TonesQuestion from './question';

const Tones = memo(() => {
  const [state, setState] = useState(TonesState);

  const page = useMemo(() => {
    switch (state.step) {
      case TonesStepType.intro:
        return <TonesIntro />;

      case TonesStepType.question:
        return <TonesQuestion key={state.index} />;
    }
  }, [state.step, state.index]);

  return (
    <TonesContext.Provider value={[state, setState]}>
      <div className='Tones'>{page}</div>
    </TonesContext.Provider>
  );
});
export default Tones;
