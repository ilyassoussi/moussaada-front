// routes.jsx
import { useRoutes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Acceul from '../pages/Home/HomePage';

export default function AppRouter() {
  const routes = useRoutes([
    { path: '/', element: <Acceul /> },
    { path: '/login', element: <Login /> },
  ]);
  return routes;
}
