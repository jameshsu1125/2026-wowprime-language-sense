import { memo, useEffect, useMemo, useState } from 'react';
import { ListeningContext, ListeningState, ListeningStepType } from './config';
import './index.less';
import ListeningIntro from './intro';
import ListeningQuestion from './question';

const Listening = memo(() => {
  const [state, setState] = useState(ListeningState);
  useEffect(() => {}, []);
  const page = useMemo(() => {
    switch (state.step) {
      case ListeningStepType.intro:
        return <ListeningIntro />;

      case ListeningStepType.question:
        return <ListeningQuestion key={state.index} />;
    }
  }, [state.step, state.index]);

  return (
    <ListeningContext.Provider value={[state, setState]}>
      <div className='Listening'>{page}</div>
    </ListeningContext.Provider>
  );
});
export default Listening;
