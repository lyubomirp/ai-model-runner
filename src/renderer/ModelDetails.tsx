import { useRef } from 'react';

function ModelDetails({ model }: { model: any }) {
  const replyEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLTextAreaElement>(null);

  const sendMsg = (msg: string | undefined) => {
    if (msg) {
      window.electron.ipcRenderer.sendMessage('chat', {
        message: msg,
        modelName: model.name,
      });
    }
  };

  window.electron.ipcRenderer.on('chat', (data: any) => {
    if (replyEl?.current) {
      replyEl.current.innerText = data;
    }
  });

  return (
    <div className="flex flex-col w-2/3">
      <h2 className="text-capitalize">{model.name.replaceAll('-', ' ')}</h2>
      <p>{model?.description}</p>
      {/* <ul className="list-unstyled flex flex-col flex-wrap"> */}
      {/*  {model?.tags?.map((tag: any) => <li key={tag}>{tag}</li>)} */}
      {/* </ul> */}

      <div className="flex flex-col gap-2">
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
            className="border border-solid border-black rounded-1 p-1 min-h-20"
          />
        </div>
      </div>
    </div>
  );
}

export default ModelDetails;
