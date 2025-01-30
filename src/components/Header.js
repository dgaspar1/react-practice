import React from 'react';
import { FaQuestionCircle, FaBell } from 'react-icons/fa';
import { styled } from '@mui/system';

const HeaderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    color: 'white',
    padding: '10px 20px',
    height: '25px', // Ajuste na altura para evitar cortes
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
});

const HeaderLeft = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const Logo = styled('img')({
    height: '40px',
});

const HeaderRight = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    whiteSpace: 'nowrap', // Garante que o texto não será cortado
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '250px', // Define um limite de largura para acomodar o nome
});

const Icon = styled('span')({
    fontSize: '20px',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
});

const UserInfo = styled('span')({
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '150px', // Garante que o nome seja exibido corretamente
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const Header = ({ user }) => {
    return (
        <HeaderContainer>
            <HeaderLeft>
                <Logo src='../assets/logo-itjucas.png' alt='Logo da Empresa' />
            </HeaderLeft>
            <HeaderRight>
                <Icon><FaQuestionCircle /></Icon>
                <Icon><FaBell /></Icon>
                <UserInfo title={user}>{user}</UserInfo>
            </HeaderRight>
        </HeaderContainer>
    );
};

export default Header;
