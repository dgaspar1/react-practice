import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarComponent from './components/Sidebar';
import CardApps from './components/CardApps';
import Management from './modules/management/user-management'; // Importa a página de user-management
import { styled } from '@mui/system';

const AppContainer = styled('div')({
  display: 'flex',
  width: '100%',
  fontFamily: '"Roboto", sans-serif',
});

const MainContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
  padding: 20,
  fontFamily: '"Roboto", sans-serif',
});

const App = () => {
  return (
    <Router>
      <AppContainer>
        <SidebarComponent />
        <MainContent>
          <Routes>
            <Route path="/" element={<CardApps title="Página inicial" />} />
            <Route path="/management/user-management" element={<Management />} />
            {/* Defina outras rotas para outros apps do módulo */}
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
