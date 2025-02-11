import { Link } from 'react-router-dom';

function Dropdown({
  open,
  isInstalled,
  model,
}: {
  open: boolean;
  isInstalled: boolean;
  model: any;
}) {
  const getOperation = (): string => {
    return isInstalled ? 'delete-model' : 'install-model';
  };

  const addRemoveModel = (modelName: string) => {
    window.electron.ipcRenderer.sendMessage(getOperation(), { modelName });
  };

  return (
    <div
      className={`
        ${open ? 'flex flex-col' : 'hidden'}
        gap-1 z-1 position-absolute
        right-0 top-half bg-white px-2 py-2 rounded-1
        border border-solid border-black
      `}
      style={{ right: '-20%' }}
    >
      {isInstalled && (
        <Link to="/chat" state={model}>
          Run
        </Link>
      )}
      <button type="button" onClick={() => addRemoveModel(model)}>
        {isInstalled ? 'Uninstall' : 'Install'}
      </button>
    </div>
  );
}

export default Dropdown;
