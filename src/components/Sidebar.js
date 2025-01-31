import React, { useState } from 'react';
import { FaUserCog, FaChartBar, FaBars } from 'react-icons/fa';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const SidebarContainer = styled('div')({
    display: 'flex',
    height: '100vh',
});

const Sidebar = styled('div')(({ isSidebarVisible }) => ({
    width: isSidebarVisible ? 175 : 60,
    backgroundColor: '#FFFFFF',
    marginTop: '50px',
    color: '#000',
    height: '100vh',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif', // TROQUEI A FONTE PARA POPPINS
    position: 'fixed',
    top: 0,
    left: 0,
    transition: 'width 0.3s ease',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    fontSize: '15px'
}));


const ToggleButton = styled('button')({
    background: 'none',
    border: 'none',
    color: '#000',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '7px',
    display: 'flex',
});

const MainContent = styled('div')(({ isSidebarVisible }) => ({
    marginLeft: isSidebarVisible ? 250 : 60,
    flexGrow: 1,
    transition: 'margin-left 0.3s ease',
    padding: 5,
}));

const SidebarList = styled('ul')({
    padding: 0,
    marginTop: 10,
    listStyle: 'none',
});

const SidebarItemWrapper = styled('li')({
    display: 'flex',
    flexDirection: 'column',
});

const SidebarItem = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '10px',
    transition: 'background-color 0.3s ease',
});

const SidebarIcon = styled('span')({
    fontSize: '20px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
});

const SidebarLabel = styled(Link)({
    textDecoration: 'none',
    color: 'black',
    whiteSpace: 'nowrap',
    '&:hover': {
        color: 'blue',
    },
});

const Submenu = styled('ul')(({ isSidebarVisible, isVisible }) => ({
    display: isSidebarVisible && isVisible ? 'block' : 'none',
    paddingLeft: 25,
    listStyle: 'none',
}));

const sidebarItems = [
    {
        icon: <FaUserCog />,
        label: 'Administração',
        to: '/management',
        submenu: [
            { label: 'Gestão de usuários', to: '/user-management' }
        ]
    },
    {
        icon: <FaChartBar />,
        label: 'Vendas',
        to: '/sales',
        submenu: [
            { label: 'Relatórios', to: '/sales/reports' },
            { label: 'Dashboard', to: '/sales/dashboard' }
        ]
    }
];

const SidebarComponent = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [locked, setLocked] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState(
        Object.fromEntries(sidebarItems.map((_, index) => [index, true]))
    );

    const toggleSidebarVisibility = (visible) => {
        if (!locked) {
            setIsSidebarVisible(visible);
            setOpenSubmenus(prev =>
                Object.fromEntries(Object.entries(prev).map(([key, _]) => [key, visible]))
            );
        }
    };

    return (
        <SidebarContainer>
            <div
                onMouseEnter={() => toggleSidebarVisibility(true)}
                onMouseLeave={() => toggleSidebarVisibility(false)}
            >
                <Sidebar isSidebarVisible={isSidebarVisible}>
                    <ToggleButton onClick={() => setLocked(!locked)}>
                        <FaBars />
                    </ToggleButton>
                    <SidebarList>
                        {sidebarItems.map((item, index) => (
                            <SidebarItemWrapper key={index}>
                                <SidebarItem>
                                    <SidebarIcon>{item.icon}</SidebarIcon>
                                    {isSidebarVisible && <SidebarLabel to={item.to}>{item.label}</SidebarLabel>}
                                </SidebarItem>
                                {item.submenu && (
                                    <Submenu isSidebarVisible={isSidebarVisible} isVisible={openSubmenus[index]}>
                                        {item.submenu.map((subItem, subIndex) => (
                                            <SidebarItem key={subIndex} style={{ paddingLeft: '20px' }}>
                                                <SidebarLabel to={subItem.to}>{subItem.label}</SidebarLabel>
                                            </SidebarItem>
                                        ))}
                                    </Submenu>
                                )}
                            </SidebarItemWrapper>
                        ))}
                    </SidebarList>
                </Sidebar>
            </div>
            <MainContent isSidebarVisible={isSidebarVisible}>{children}</MainContent>
        </SidebarContainer>
    );
};

export default SidebarComponent;