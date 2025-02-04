import { DefaultProcess } from './Default.tsx';
import { Outlet } from 'react-router-dom';

export const ProcessLayout = () => {
  return (
    <DefaultProcess>
      <Outlet />
    </DefaultProcess>
  );
};
