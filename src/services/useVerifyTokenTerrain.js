import axiosInstanceTerrain from '../hooks/axiosInstanceTerrain';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useVerifyTokenTerrain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token-terrain');
      if (!token) {
        navigate('/boTerrain1266654');
        return;
      }

      try {
        const response = await axiosInstanceTerrain.get(`/utilisateur/auth/verifyToken`, {
          params: { token }
        });

        if (response.data === true) {
          const infoUser = await axiosInstanceTerrain.get(`/utilisateur/information`);
          const information = infoUser.data.data;


          switch (information.role.type_role) {
            case 'Service_terrain':
              if (location.pathname === '/boTerrain1266654') {
                navigate('/agent/espace-technicien');
              } 
              break;
            default:
              navigate('/boTerrain1266654');
              break;
          }
        }

      } catch (err) {
        console.error('Token invalide ou expiré', err);
        localStorage.removeItem('token-terrain');
        navigate('/boTerrain1266654');
      }
    };

    verifyToken();
  }, [navigate]);
};

export default useVerifyTokenTerrain;
