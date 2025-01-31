import React, { useState } from 'react';
import { FaQuestionCircle, FaBell, FaUserCircle, FaEdit, FaSignOutAlt, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { styled } from '@mui/system';

const HeaderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#232F3E',
    color: 'white',
    padding: '10px 0px',
    height: '25px', // Ajuste na altura para um design mais sofisticado
    width: '100%',
    position: 'fixed',
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
});

const HeaderLeft = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const Logo = styled('img')({
    height: '35px', // Reduzindo ligeiramente para um visual mais refinado
    filter: 'brightness(1.2)',
});

const HeaderRight = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
});

const Icon = styled('span')({
    fontSize: '20px',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
});

const UserInfoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '6px',
    backgroundColor: '#1A2533',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
        backgroundColor: '#2C3E50',
    },
    marginRight: '10px'
});

const UserIcon = styled(FaUserCircle)({
    fontSize: '20px',
    color: 'white',
});

const UserInfo = styled('span')({
    color: 'white',
});

const DropdownMenu = styled('div')({
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#2C3E50',
    color: 'white',
    borderRadius: '6px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    minWidth: '160px',
    zIndex: 1000,
    padding: '5px 0',
});

const DropdownItem = styled('div')({
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#37475A',
    }
});

const Header = ({ user }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [helpMenuOpen, setHelpMenuOpen] = useState(false);

    return (
        <HeaderContainer>
            {/* Logo */}
            <HeaderLeft>
                <Logo src='./logo-itjucas.png' alt='Logo da Empresa' width='100px' height='100px' />
            </HeaderLeft>

            {/* Ícones e Usuário */}
            <HeaderRight>
                {/* Ícone de Ajuda */}
                <Icon title="Ajuda" onClick={() => setHelpMenuOpen(!helpMenuOpen)}>
                    <FaQuestionCircle />
                    {helpMenuOpen && (
                        <DropdownMenu>
                            <DropdownItem>
                                <FaInfoCircle /> FAQ
                            </DropdownItem>
                            <DropdownItem>
                                <FaEnvelope /> Suporte
                            </DropdownItem>
                        </DropdownMenu>
                    )}
                </Icon>

                {/* Ícone de Notificações */}
                <Icon title="Notificações">
                    <FaBell />
                </Icon>

                {/* Usuário */}
                <UserInfoContainer title={user} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    <UserIcon />
                    <UserInfo>{user}</UserInfo>
                    {userMenuOpen && (
                        <DropdownMenu>
                            <DropdownItem>
                                <FaEdit /> Editar
                            </DropdownItem>
                            <DropdownItem>
                                <FaSignOutAlt /> Logout
                            </DropdownItem>
                        </DropdownMenu>
                    )}
                </UserInfoContainer>
            </HeaderRight>
        </HeaderContainer>
    );
};

export default Header;
