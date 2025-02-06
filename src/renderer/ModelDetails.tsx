import { useRef, useState } from 'react';
import Dropdown from '../components/dropdown';

function ModelDetails({ model }: { model: any }) {
  // const replyEl = useRef<HTMLDivElement>(null);
  // const inputEl = useRef<HTMLTextAreaElement>(null);

  const [openTags, setOpenTags] = useState<Record<string, boolean>>({});

  const isInstalled = (tag: string) => {
    return tag.includes('|');
  };

  // const sendMsg = (msg: string | undefined) => {
  //   if (msg) {
  //     window.electron.ipcRenderer.sendMessage('chat', {
  //       message: msg,
  //       modelName: model.name,
  //     });
  //   }
  // };

  // window.electron.ipcRenderer.on('chat', (data: any) => {
  //   if (replyEl?.current) {
  //     replyEl.current.innerText = data;
  //   }
  // });

  return (
    <div className="flex flex-col px-2">
      <div className="h-20">
        <h2 className="text-capitalize">{model.name.replaceAll('-', ' ')}</h2>
        <p>{model?.description}</p>
      </div>
      <ul className="list-unstyled flex flex-col px-0 gap-1 flex-wrap h-75">
        {model?.tags?.map((tag: string) => (
          <li className="text-align-center w-1/3 position-relative" key={tag}>
            <button
              type="button"
              className={`
                py-2 min-w-full rounded-1 cursor-pointer
                ${isInstalled(tag) ? 'bg-green text-white' : 'bg-transparent'}
              `}
              key={`${tag}-btn`}
              onClick={() =>
                setOpenTags({ ...openTags, [tag]: !openTags[tag] })
              }
            >
              {tag.replace('|installed', ' ')}
            </button>
            <Dropdown
              key={`${tag}-dropdown`}
              open={openTags[tag]}
              isInstalled={isInstalled(tag)}
            />
          </li>
        ))}
      </ul>

      {/* <div className="flex flex-col gap-2"> */}
      {/*  <div className="flex flex-col gap-1"> */}
      {/*    Message: */}
      {/*    <textarea className="p-1 min-h-20" ref={inputEl} cols={3} /> */}
      {/*    <button */}
      {/*      type="button" */}
      {/*      className="max-w-1/3" */}
      {/*      onClick={() => sendMsg(inputEl?.current?.value)} */}
      {/*    > */}
      {/*      Send */}
      {/*    </button> */}
      {/*  </div> */}
      {/*  <div className="flex flex-col gap-1"> */}
      {/*    Reply: */}
      {/*    <div */}
      {/*      ref={replyEl} */}
      {/*      className="border border-solid border-black rounded-1 p-1 min-h-20" */}
      {/*    /> */}
      {/*  </div> */}
      {/* </div> */}
    </div>
  );
}

export default ModelDetails;
