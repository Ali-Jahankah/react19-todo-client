import type { FC, ReactElement } from 'react';
import './header.css';
const Header: FC = (): ReactElement => {
  return (
    <header className="header">
      <p>React 19 | TypeScript | Zustand</p>
    </header>
  );
};

export default Header;
