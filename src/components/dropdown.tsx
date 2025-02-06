function Dropdown({
  open,
  isInstalled,
}: {
  open: boolean;
  isInstalled: boolean;
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
      {isInstalled && <span>Run</span>}
      <span>{isInstalled ? 'Uninstall' : 'Install'}</span>
    </div>
  );
}

export default Dropdown;
