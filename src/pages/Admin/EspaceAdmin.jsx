import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const EspaceAdmin = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div>
      <h1>Bienvenue {userInfo?.nometprenom}</h1>
      <p>Email : {userInfo?.mail}</p>
      <p>Rôle : {userInfo?.role.type_role}</p>
    </div>
  );
};

export default EspaceAdmin;
