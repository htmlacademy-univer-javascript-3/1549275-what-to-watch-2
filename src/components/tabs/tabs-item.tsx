import React from 'react';
import { ItemType } from './tabs.types';

const TabsItem: React.FC<ItemType & { activeKey: string; onClick: (key: string) => void }> = ({
  label,
  option,
  activeKey,
  onClick
}) => (
  <li className={`film-nav__item ${activeKey === option ? 'film-nav__item--active' : ''}`}>
    <div
      className="film-nav__link"
      key={option}
      onClick={() => {
        onClick(option);
      }}
    >
      {label}
    </div>
  </li>
);
const ItemMemo = React.memo(TabsItem);

export default ItemMemo;
