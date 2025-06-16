import React , { useEffect }from 'react';
import './App.css';
import RoutesList from './routes/AppRouter';
import { UserProvider } from 'context/UserContext';
import { TerreProvider } from 'context/TerreContext';
import { useTranslation } from 'react-i18next';
function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);
  return (
    <UserProvider>
      <TerreProvider>  
        <RoutesList />
      </TerreProvider>
    </UserProvider>
  );
}

export default App;
