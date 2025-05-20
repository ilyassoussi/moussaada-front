import React from 'react';
import './App.css';
import RoutesList from './routes/AppRouter';
import { UserProvider } from 'context/UserContext';
import { TerreProvider } from 'context/TerreContext';

function App() {
  return (
    <UserProvider>
      <TerreProvider>  
        <RoutesList />
      </TerreProvider>
    </UserProvider>
  );
}

export default App;
