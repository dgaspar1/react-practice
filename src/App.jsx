import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarComponent from './components/Sidebar';
import CardApps from './components/CardApps';
import Header from './components/Header'; // Importação do Header
import Management from './modules/management'; // Importa a página de user-management
import UserManagement from './modules/management/user-management'; // Importa a página de user-management
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
                    user="denys.gaspar@itjucas.com.br"
                />
                <MainContentWrapper>
                    <SidebarComponent />
                    <MainContent>
                        <Routes>
                            <Route path="/" element={<CardApps title="Página inicial" />} />
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/management" element={<Management />} />
                            <Route path="/schedule" element={<UserManagement />} />
                            <Route path="/maintenence" element={<UserManagement />} />
                            <Route path="/equipaments" element={<UserManagement />} />
                            <Route path="/maintenence-order" element={<UserManagement />} />
                            <Route path="/script" element={<UserManagement />} />
                            <Route path="/history" element={<UserManagement />} />
                            <Route path="/maintenence-report" element={<UserManagement />} />
                            <Route path="/financial" element={<UserManagement />} />
                            <Route path="/flow" element={<UserManagement />} />
                            <Route path="/payment" element={<UserManagement />} />
                            <Route path="/receive" element={<UserManagement />} />
                            <Route path="/procurement" element={<UserManagement />} />
                            <Route path="/contract" element={<UserManagement />} />
                            <Route path="/cost-center" element={<UserManagement />} />
                            <Route path="/products" element={<UserManagement />} />
                            <Route path="/service" element={<UserManagement />} />
                            <Route path="/supplier" element={<UserManagement />} />
                            <Route path="/procurement-reports" element={<UserManagement />} />
                            <Route path="/sales" element={<UserManagement />} />
                            <Route path="/sale-order" element={<UserManagement />} />
                            <Route path="/sale-proposal" element={<UserManagement />} />
                            <Route path="/track" element={<UserManagement />} />
                            <Route path="/sales-report" element={<UserManagement />} />
                            {/* Defina outras rotas para outros apps do módulo */}
                        </Routes>
                    </MainContent>
                </MainContentWrapper>
            </AppContainer>
        </Router>
    );
};

export default App;
