import { useState } from 'react';
import Dropdown from '../components/Dropdown';

function ModelDetails({ model }: { model: any }) {
  const [openTag, setOpenTag] = useState<string | null>();

  const isInstalled = (tag: string) => {
    return tag.includes('|');
  };

  const cleanTagName = (tag: string) => {
    return tag.replace('|installed', '');
  };

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
              onClick={() => setOpenTag(openTag === tag ? null : tag)}
            >
              {cleanTagName(tag)}
            </button>
            <Dropdown
              open={openTag === tag}
              isInstalled={isInstalled(tag)}
              model={`${model.name}:${cleanTagName(tag)}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModelDetails;
