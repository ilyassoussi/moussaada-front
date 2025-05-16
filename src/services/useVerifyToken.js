import axiosInstance from '../hooks/axiosInstance'; // ton axiosInstance configuré
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useVerifyToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axiosInstance.get(`/utilisateur/auth/verifyToken`, {
          params: { token }
        });

        // exemple de réponse attendue : { role: { type_role: "Admin" }, ... }
        const role = response.data?.role?.type_role;

        if (role === 'ROLE_Admin') {
          navigate('/espace-admin');
        } else if (role === 'ROLE_Paysan') {
          navigate('/espace-paysan');
        } else if (role === 'ROLE_Service_terrain'){
          navigate('/espace-techn');
        }
      } catch (err) {
        console.error('Token invalide ou expiré', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate]);
};

export default useVerifyToken;
