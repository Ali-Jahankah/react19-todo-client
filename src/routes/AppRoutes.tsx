import { type FC, type ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const AppRoutes: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
