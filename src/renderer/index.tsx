import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('fetch-models', (arg: any) => {
  if (arg) {
    try {
      const models = JSON.parse(arg.models);
      root.render(
        <App models={models} installedModels={arg.installedModels} />,
      );
    } catch (err: any) {
      console.error(err);
    }
  }
});

window.electron.ipcRenderer.sendMessage('fetch-models');
