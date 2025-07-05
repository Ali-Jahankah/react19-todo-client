import type { FC, ReactElement } from 'react';
import './footer.css';
const Footer: FC = (): ReactElement => {
  return (
    <footer className="footer">
      <a href="https://uaral.me" target="_blank">
        Ali Jahankhah
      </a>
      <span>|</span>
      <span>2025</span>
    </footer>
  );
};

export default Footer;
