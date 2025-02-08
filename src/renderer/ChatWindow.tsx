import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ChatWindow() {
  const replyEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLTextAreaElement>(null);

  const location = useLocation();
  const model = location.state || {};

  const sendMsg = (msg: string | undefined) => {
    if (msg) {
      window.electron.ipcRenderer.sendMessage('chat', {
        message: msg,
        modelName: model,
      });
    }
  };

  window.electron.ipcRenderer.on('chat', (data: any) => {
    if (replyEl?.current) {
      replyEl.current.innerText = data;
    }
  });

  return (
    <div className="flex flex-col gap-2 py-2">
      <div>
        <a href="/"> Back</a>
      </div>
      <div className="flex flex-col gap-1">
        Message:
        <textarea className="p-1 min-h-20" ref={inputEl} cols={3} />
        <button
          type="button"
          className="max-w-1/3"
          onClick={() => sendMsg(inputEl?.current?.value)}
        >
          Send
        </button>
      </div>
      <div className="flex flex-col gap-1">
        Reply:
        <div
          ref={replyEl}
          className="border border-solid border-black rounded-1 p-1"
        />
      </div>
    </div>
  );
}

export default ChatWindow;
