import React from 'react';
import { styled } from '@mui/system';
import CardApps from '../../../components/CardApps'; // Assumindo que o CardApps está dentro de components
import { Link } from 'react-router-dom';

const PageContainer = styled('div')({
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    padding: 0,
    fontFamily: '"Roboto", sans-serif',
});

const PageTitle = styled('h1')({
    fontSize: '24px',
    color: '#2C3E50',
    fontFamily: '"Poppins", sans-serif',
});

const CardText = styled('p')({
    fontSize: '14px',
    color: '#7F8C8D',
    fontFamily: '"Open Sans", sans-serif',
});

const UserManagement = () => {
    return (
        <PageContainer>
            <PageTitle>Gerenciamento de Usuários</PageTitle>

            {/* Exibindo os apps recentes */}
            <CardApps title="Apps Recentes">
                <CardText>
                    <Link to="/management/user-management/user-management">Gestão de usuários</Link>
                </CardText>
            </CardApps>

            {/* Exibindo todos os apps */}
            <CardApps title="Todos os Apps">
                <CardText>
                    <Link to="/management/user-management/lista-usuarios">Gestão de usuários</Link>
                </CardText>
            </CardApps>

            {/* Exibindo dashboards */}
            <CardApps title="Dashboard">
                <CardText>
                    <Link to="/management/user-management/dashboard">Visão geral</Link>
                </CardText>
            </CardApps>
        </PageContainer>
    );
};

export default UserManagement;
