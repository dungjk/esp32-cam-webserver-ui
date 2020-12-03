import { ChevronDown } from 'icons';
import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { ArrayFind, ArrayMap } from 'utils/array.utils';

import { dropdown_component, dropdown_list } from './dropdown.scss';

type DropItemType = {
  key: any;
  value: string;
};

const DropList: FunctionalComponent<{ items: DropItemType[]; onSelect: (item: DropItemType) => void }> = ({
  items,
  onSelect,
}) => {
  return (
    <ul className={dropdown_list}>
      {ArrayMap(items, (it) => {
        return (
          <li
            onClick={() => {
              onSelect && onSelect(it);
            }}
          >
            {it.value}
          </li>
        );
      })}
    </ul>
  );
};

const Dropdown: FunctionalComponent<{
  options: DropItemType[];
  key?: any;
  toggle?: boolean;
  onSelect?: (key: DropItemType) => void;
}> = ({ options, key, onSelect }) => {
  const [open, setOpen] = useState(false);
  const onToggleClicked = (e) => {
    setOpen(!open);
  };
  const onSelectItem = (it: DropItemType) => {
    console.log(it);
    onSelect && onSelect(it);
  };
  const selectedItem = ArrayFind(options, (it) => it.key === key);
  return (
    <div className={dropdown_component}>
      <span>{selectedItem?.value}</span>
      <span onClick={onToggleClicked}>
        <ChevronDown size={14} />
      </span>
      {open ? <DropList items={options} onSelect={onSelectItem} /> : null}
    </div>
  );
};

export default Dropdown;
