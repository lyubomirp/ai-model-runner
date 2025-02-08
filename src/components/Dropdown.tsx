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
      <Link to="/" state={model}>
        {isInstalled ? 'Uninstall' : 'Install'}
      </Link>
    </div>
  );
}

export default Dropdown;
