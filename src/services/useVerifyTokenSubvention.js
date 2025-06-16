import axiosInstanceSubvention from '../hooks/axiosInstanceSubvention';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useVerifyTokenSubvention = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token-subventions');
      if (!token) {
        navigate('/boSubventions55684');
        return;
      }

      try {
        const response = await axiosInstanceSubvention.get(`/utilisateur/auth/verifyToken`, {
          params: { token }
        });

        if (response.data === true) {
          const infoUser = await axiosInstanceSubvention.get(`/utilisateur/information`);
          const information = infoUser.data.data;


          switch (information.role.type_role) {
            case 'Subvention':
              if (location.pathname === '/boSubventions55684') {
                navigate('/agent/dashboard-subvention');
              } 
              break;
            default:
              navigate('/boSubventions55684');
              break;
          }
        }

      } catch (err) {
        console.error('Token invalide ou expiré', err);
        localStorage.removeItem('token-subventions');
        navigate('/boSubventions55684');
      }
    };

    verifyToken();
  }, [navigate]);
};

export default useVerifyTokenSubvention;
