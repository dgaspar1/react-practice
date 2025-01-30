import React from 'react';
import { styled } from '@mui/system';
import CardApps from '../../../components/CardApps'; // Assumindo que o CardApps está dentro de components
import { Link } from 'react-router-dom';

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
  padding: 20,
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
          <Link to="/management/user-management/criar-usuario">Criar novo usuário</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/management/user-management/editar-usuario">Editar usuário</Link>
        </CardText>
      </CardApps>

      {/* Exibindo todos os apps */}
      <CardApps title="Todos os Apps">
        <CardText>
          <Link to="/management/user-management/lista-usuarios">Lista de usuários</Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/management/user-management/permissoes">Gerenciar permissões</Link>
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
