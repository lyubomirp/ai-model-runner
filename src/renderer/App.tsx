import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import ModelDetails from './ModelDetails';

declare global {
  interface Window {
    electron: any;
  }
}

function Hello({
  models,
  installedModels,
}: {
  models: any[];
  installedModels: any[];
}) {
  const [model, setModel] = useState<any>(null);

  console.log(installedModels);

  return (
    <div className="flex flex-row gap-2 justify-between align-self-center">
      <div className="flex flex-col gap-1 w-1/3">
        <h1>All AI Models:</h1>
        <input id="titleInput" />
        <ul
          className="flex flex-col list-unstyled px-0"
          style={{ maxHeight: 400, overflowY: 'scroll' }}
        >
          {models.map((m: any) =>
            installedModels.map((im) => {
              if (m.name === im.name.split(':')[0]) {
                return (
                  <li key={m.name}>
                    <button type="button" onClick={() => setModel(m)}>
                      {m.name}
                    </button>
                  </li>
                );
              }
            }),
          )}
        </ul>
      </div>
      {model && (
        <ModelDetails
          model={model}
          installedModel={installedModels.find((im) =>
            im.name.includes(model.name),
          )}
        />
      )}
    </div>
  );
}

export default function App({
  models,
  installedModels,
}: {
  models: any[];
  installedModels: any[];
}) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Hello models={models} installedModels={installedModels} />}
        />
      </Routes>
    </Router>
  );
}
