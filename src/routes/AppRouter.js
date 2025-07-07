// routes.jsx
import { useRoutes } from 'react-router-dom';
import Login from '../pages/User/Login/Login';
import Acceul from '../pages/User/Home/HomePage';
import Contact from '../pages/User/Contact/ContactUs';
import Validation from '../pages/User/ValidationCompte/VerificationPage';
import Paysan from '../pages/paysan/MonCompte';
import UpdateSituation from '../pages/paysan/UpdateSituationPage';
import Reclamation from '../pages/paysan/ReclamationsPage';
import DemandeSubvention from '../pages/paysan/DemandeSubventionPage';
import Reservation from '../pages/paysan/EventReservationPage';
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
import Services from '../pages/User/ServicesPage';
import Actualites from '../pages/User/NewsPage';
import ServicesUnique from '../pages/User/ServiceDetailPage';
import Propos from '../pages/User/PorposNous';
import Admin from '../pages/Admin/Admin';


export default function AppRouter() {
  const routes = useRoutes([
    { path: '/', element: <Acceul /> },
    { path: '/contact', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/validation', element: <Validation /> },
    { path: '/espace-paysan', element: <Paysan /> },
    { path: '/mise-a-jour-situation', element: <UpdateSituation /> },
    { path: '/prise-de-rendez-vous', element: <Reservation /> },
    { path: '/demande-subventions', element: <DemandeSubvention /> },
    { path: '/reclamations', element: <Reclamation /> },
    { path: '/suivi-subventions', element: <SuivisSubvention /> },
    { path: '/suivi-reclamations', element: <SuivisReclamation /> },
    { path: '/nos-services', element: <Services /> },
    { path: '/services/subvention/:id', element: <ServicesUnique /> },
    { path: '/nos-actualites', element: <Actualites /> },
    { path: '/qui-somme-nous', element: <Propos /> },
    { path: '/boSubventions55684', element: <AgentLoginPage /> },
    { path: '/boadmin55684', element: <Admin /> },
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
