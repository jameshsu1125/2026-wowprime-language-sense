import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import {
  ListeningContext,
  ListeningHeyLongQuestions,
  ListeningQuestions,
  ListeningState,
  ListeningStepType,
} from './config';
import './index.less';
import ListeningIntro from './intro';
import ListeningQuestion from './question';

const Listening = memo(() => {
  const [context] = useContext(Context);
  const sounds = context[ActionType.Sounds]!;

  const [state, setState] = useState(ListeningState);

  // const normalQuestion = shuffleArray([...ListeningQuestions]);
  // const heyLongQuestion = shuffleArray([...ListeningQuestions]);

  // const questions = useMemo(() => {
  //   return isHeyLongQuestion
  //     ? [...normalQuestion.slice(0, 2), ...heyLongQuestion.slice(0, 1)]
  //     : [...normalQuestion.slice(0, 3)];
  // }, []);

  const questions = useMemo(() => [...ListeningQuestions, ...ListeningHeyLongQuestions], []);

  useEffect(() => {
    sounds.tracks?.preloadByName(
      questions.map((q) => q.question.sound),
      'onListening',
      () => setState((S) => ({ ...S, isSoundsLoaded: true })),
    );
  }, []);

  const page = useMemo(() => {
    switch (state.step) {
      case ListeningStepType.intro:
        return <ListeningIntro />;

      case ListeningStepType.question:
        return <ListeningQuestion key={state.index} questions={questions} />;
    }
  }, [state.step, state.index]);

  return (
    <ListeningContext.Provider value={[state, setState]}>
      <div className='Listening'>{page}</div>
    </ListeningContext.Provider>
  );
});
export default Listening;
