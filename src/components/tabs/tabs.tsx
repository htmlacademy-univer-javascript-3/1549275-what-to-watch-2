import React, { Fragment, useCallback, useState } from 'react';
import { TabProps, TabsProps } from './tabs.types';
import TabsItem from './tabs-item';

export const Tab: React.FC<TabProps> = ({ children }) => (<Fragment key={children.key}>{children}</Fragment>);

const Tabs: React.FunctionComponent<TabsProps> = ({
  items, defaultActiveKey, children
}) => {
  const [activeKey, setTabActiveKey] = useState<string>(defaultActiveKey ?? items[0].option);
  const handleClick = useCallback((key: string) => setTabActiveKey(key), []);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {items.map((item) => <TabsItem {...item} key={item.option} activeKey={activeKey} onClick={handleClick} />)}
        </ul>
      </nav>
      {children?.find((child) => child?.key === activeKey) ?? null}
    </div>
  );
};

export default Tabs;
