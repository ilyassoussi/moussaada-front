import axiosInstanceTerrain from '../hooks/axiosInstanceTerrain';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useVerifyTokenAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token-admin');

      if (!token) {
        navigate('/boadmin55684');
        return;
      }

      try {
        console.log("first")
        const response = await axiosInstanceTerrain.get(`/utilisateur/auth/verifyToken`, {
          params: { token }
        });
        if(response.data === false ){
          console.log("first")
          localStorage.removeItem('token-admin');
        }

      } catch (err) {
        console.error('Token invalide ou expiré', err);
        localStorage.removeItem('token-admin');
      }
    };

    verifyToken();
  }, [navigate]);
};

export default useVerifyTokenAdmin;
