// routes.jsx
import { useRoutes } from 'react-router-dom';
import Login from '../pages/User/Login/Login';
import Acceul from '../pages/User/Home/HomePage';
import Validation from '../pages/User/ValidationCompte/VerificationPage';
import Paysan from '../pages/paysan/MonCompte';
import UpdateSituation from '../pages/paysan/UpdateSituationPage';
import Reclamation from '../pages/paysan/ReclamationsPage';
import DemandeSubvention from '../pages/paysan/DemandeSubventionPage';
import SuivisReclamation from '../pages/paysan/SuiviReclamationsPage';
import SuivisSubvention from '../pages/paysan/SuiviSubventionsPage';

export default function AppRouter() {
  const routes = useRoutes([
    { path: '/', element: <Acceul /> },
    { path: '/login', element: <Login /> },
    { path: '/validation', element: <Validation /> },
    { path: '/espace-paysan', element: <Paysan /> },
    { path: '/mise-a-jours-situation', element: <UpdateSituation /> },
    { path: '/demande-subventions', element: <DemandeSubvention /> },
    { path: '/reclamations', element: <Reclamation /> },
    { path: '/suivi-subventions', element: <SuivisSubvention /> },
    { path: '/suivi-reclamations', element: <SuivisReclamation /> },
  ]);
  return routes;
}
