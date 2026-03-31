import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext } from 'react';

const Modal = memo(() => {
  const [context, setContext] = useContext(Context);
  const modal = context[ActionType.Modal];

  const closeModal = () => {
    setContext({
      type: ActionType.Modal,
      state: { enabled: false },
    });
  };

  if (!modal?.enabled) return null;

  const title = modal.title || '';
  const content = modal.content || '';
  const labels = modal.Label?.length ? modal.Label : ['確認'];

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4'
      onClick={() => {
        if (modal.closeOnOverlay !== false) closeModal();
      }}
    >
      <div
        className='w-full max-w-lg rounded-2xl border border-black/10 bg-white p-6 shadow-2xl'
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {title && <h3 className='font-line-bold text-xl text-slate-900'>{title}</h3>}
        <div className='font-line-regular mt-3 text-base leading-7 text-slate-700'>{content}</div>

        <div className='mt-6 flex items-center justify-end gap-3'>
          {labels.length > 1 && (
            <button
              className='font-line-bold rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50'
              onClick={() => {
                modal.onCancel?.();
                closeModal();
              }}
              type='button'
            >
              {labels[0]}
            </button>
          )}

          <button
            className='bg-primary font-line-bold rounded-lg px-4 py-2 text-white transition-opacity hover:opacity-90'
            onClick={() => {
              modal.onConfirm?.();
              closeModal();
            }}
            type='button'
          >
            {labels.length > 1 ? labels[1] : labels[0]}
          </button>
        </div>
      </div>
    </div>
  );
});
export default Modal;
