import './App.css';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModelDetails from './ModelDetails';

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
    window.electron.ipcRenderer.once('fetch-all-models', (m: any[]) => {
      setModels(m);
    });
  }, [models]);

  return (
    <div className="flex flex-row gap-2 justify-between align-self-center">
      <div className="flex flex-col gap-1 w-1/3">
        <h1>All AI Models:</h1>
        <input id="titleInput" />
        <ul className="flex flex-col list-unstyled px-1 overthrow-y-scroll gap-1 h-75">
          {models.map((m: any) => {
            if (m.installed) {
              return (
                <li
                  className="flex flex-row justify-between cursor-pointer"
                  key={m.name}
                >
                  <button
                    type="button"
                    className="px-1 py-2 min-w-full bg-transparent rounded-1 outline-none border border-solid border-black"
                    onClick={() => setModel(m)}
                  >
                    <span>{m.name}</span>
                  </button>
                </li>
              );
            }

            return (
              <li
                className="flex flex-row justify-between cursor-pointer"
                key={m.name}
              >
                <button
                  type="button"
                  className="px-1 py-2 min-w-full bg-transparent rounded-1 outline-none border border-solid border-black"
                  onClick={() => setModel(m)}
                >
                  {m.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {model && <ModelDetails model={model} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
