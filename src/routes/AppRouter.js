// routes.jsx
import { useRoutes } from 'react-router-dom';
import Login from '../pages/User/Login/Login';
import Acceul from '../pages/User/Home/HomePage';
import Validation from '../pages/User/ValidationCompte/VerificationPage';
import Paysan from '../pages/paysan/MonCompte';

export default function AppRouter() {
  const routes = useRoutes([
    { path: '/', element: <Acceul /> },
    { path: '/login', element: <Login /> },
    { path: '/validation', element: <Validation /> },
    { path: '/espace-paysan', element: <Paysan /> },
  ]);
  return routes;
}
