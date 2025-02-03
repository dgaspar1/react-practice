import React from 'react';
import { styled } from '@mui/system';
import CardApps from '../../../components/Card';
import { Link } from 'react-router-dom';


// JSON manual representando os apps no módulo "management"
const apps = [
    {
        name: "Gestão de usuários",
        path: "/user-management"
    }
];

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

const Equipment = () => {
    return (
        <PageContainer>
            <PageTitle>Painel de administração</PageTitle>

            <CardApps title="Apps recentes">
                <CardText>
                    <Link to="/user-management">Gestão de usuários</Link>
                </CardText>
            </CardApps>

            {/* Exibindo todos os apps */}
            <CardApps title="Todos os apps">
                {apps.map((app, index) => (
                    <CardText key={index}>
                        <a href={app.path}>{app.name}</a>
                    </CardText>
                ))}
            </CardApps>
        </PageContainer>
    );
};

export default Equipment;
