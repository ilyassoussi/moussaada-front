import axiosInstance from '../hooks/axiosInstance';
import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TerreContext } from '../context/TerreContext';

const useVerifyToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext); 
  const { setTerreInfo } = useContext(TerreContext);

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

        if (response.data === true) {
          const infoUser = await axiosInstance.get(`/utilisateur/information`);
          const information = infoUser.data.data;

          setUserInfo(information); // <== stocker les infos

          switch (information.role.type_role) {
            case 'Paysan':
              const infoTerreFromPaysan = await axiosInstance.get(`/paysan/info/terre`);
              setTerreInfo(infoTerreFromPaysan.data.data.getInfoResponse)
              if (location.pathname === '/login') {
                navigate('/espace-paysan');
              } else {
                navigate('');
              }
              break;
            default:
              navigate('/login');
              break;
          }
        }

      } catch (err) {
        console.error('Token invalide ou expiré', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate, setTerreInfo, setUserInfo]);
};

export default useVerifyToken;
