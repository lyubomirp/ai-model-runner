import './App.css';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModelDetails from './ModelDetails';
import ChatWindow from './ChatWindow';

declare global {
  interface Window {
    electron: any;
  }
}

function Hello() {
  const [model, setModel] = useState<any>(null);
  const [models, setModels] = useState<any[]>([]);

  window.electron.ipcRenderer.sendMessage('fetch-all-models');

  useEffect(() => {
    // Currently only sorting... always. Will think of something better
    // In the future
    window.electron.ipcRenderer.once('fetch-all-models', (m: any[]) => {
      setModels(m.sort((el: any) => -el.installed));
    });
  }, [models]);

  return (
    <div className="flex flex-row gap-2 justify-between align-self-center">
      <div className="flex flex-col gap-1 w-1/3 px-1">
        <h1 className="mb-0">All AI Models:</h1>
        <ul className="flex flex-col list-unstyled pl-0 pr-1 overthrow-y-scroll gap-1 h-90">
          {models.map((m: any) => {
            return (
              <li
                className="flex flex-row justify-between cursor-pointer"
                key={m.name}
              >
                <button
                  type="button"
                  className={`
                    ${m.installed ? 'bg-green text-white' : 'bg-transparent'}
                    'px-1 py-2 min-w-full rounded-1
                     outline-none border
                     border-solid border-black'
                  `}
                  onClick={() => setModel(m)}
                >
                  {m.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-2/3" key={model?.name}>
        {model && <ModelDetails model={model} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
}
