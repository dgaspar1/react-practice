import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarComponent from './components/Sidebar';
import CardApps from './components/CardApps';
import Header from './components/Header'; // Importação do Header
import Management from './modules/management/user-management'; // Importa a página de user-management
import { styled } from '@mui/system';

const AppContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column', // Organiza o layout verticalmente
    width: '100%',
    fontFamily: '"Roboto", sans-serif',
});

const MainContentWrapper = styled('div')({
    display: 'flex',
    width: '100%',
    flexGrow: 1, // Permite que ocupe o espaço restante abaixo do Header
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
                {/* Instanciando o Header */}
                {/* Wrapper para organizar Sidebar e Conteúdo Principal */}
                <Header
                    user="João da Silva"
                />
                <MainContentWrapper>
                    <SidebarComponent />
                    <MainContent>
                        <Routes>
                            <Route path="/" element={<CardApps title="Página inicial" />} />
                            <Route path="/management/user-management" element={<Management />} />
                            {/* Defina outras rotas para outros apps do módulo */}
                        </Routes>
                    </MainContent>
                </MainContentWrapper>
            </AppContainer>
        </Router>
    );
};

export default App;
