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
import AgentLoginPage from '../pages/Subventions/AgentLoginPage';
import AgentDashboard from '../pages/Subventions/DashboardPage';
import Demandes from '../pages/Subventions/ApplicationsPage';
import Subvention from '../pages/Subventions/SubsidiesPage';
import Terrain from '../pages/Subventions/MissionsPage';
import Rapports from '../pages/Subventions/ReportsPage';
import Layout from '../components/SubventionsCompo/Layout';
import TerrainEspace from '../pages/Terrain/TerrainPages';
import LoginTerrain from '../pages/Terrain/Login/LoginPage';


export default function AppRouter() {
  const routes = useRoutes([
    { path: '/', element: <Acceul /> },
    { path: '/login', element: <Login /> },
    { path: '/validation', element: <Validation /> },
    { path: '/espace-paysan', element: <Paysan /> },
    { path: '/mise-a-jour-situation', element: <UpdateSituation /> },
    { path: '/demande-subventions', element: <DemandeSubvention /> },
    { path: '/reclamations', element: <Reclamation /> },
    { path: '/suivi-subventions', element: <SuivisSubvention /> },
    { path: '/suivi-reclamations', element: <SuivisReclamation /> },
    { path: '/boSubventions55684', element: <AgentLoginPage /> },
    {
      element: <Layout />,
      children: [
        { path: '/agent/dashboard-subvention', element: <AgentDashboard /> },
        { path: '/agent/demandes', element: <Demandes /> },
        { path: '/agent/subvention', element: <Subvention /> },
        { path: '/agent/missions-terrain', element: <Terrain /> },
        { path: '/agent/rapports', element: <Rapports /> },
      ],
    },
    { path: '/agent/espace-technicien', element: <TerrainEspace /> },
    { path: 'boTerrain1266654', element: <LoginTerrain /> },
  ]);
  return routes;
}
