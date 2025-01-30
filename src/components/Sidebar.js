import React, { useState } from 'react';
import { FaUserCog, FaDatabase, FaChartBar, FaBars, FaUsers, FaKey, FaServer, FaFileImport, FaChartLine, FaTachometerAlt } from 'react-icons/fa';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const SidebarContainer = styled('div')({
    display: 'flex',
    height: '100vh',
});

const Sidebar = styled('div')(({ isSidebarVisible }) => ({
    width: isSidebarVisible ? 250 : 60,
    backgroundColor: '#FFFFFF',
    marginTop: '50px',
    color: '#000',
    height: '100vh',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: 'width 0.3s ease',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
}));

const ToggleButton = styled('button')(({ isSidebarVisible }) => ({
    background: 'none',
    border: 'none',
    color: '#000',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '10px',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const MainContent = styled('div')(({ isSidebarVisible }) => ({
    marginLeft: isSidebarVisible ? 250 : 60,
    flexGrow: 1,
    transition: 'margin-left 0.3s ease',
    padding: 20,
}));

const SidebarList = styled('ul')({
    padding: 0,
    marginTop: 20,
    listStyle: 'none',
});

const SidebarItem = styled('li')({
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '10px',
    transition: 'background-color 0.3s ease',
});

const SidebarIcon = styled('span')({
    fontSize: '20px',
    marginRight: '10px',
});

const SidebarLabel = styled('span')({
    whiteSpace: 'nowrap',
    '&:hover': {
        color: 'blue',
    },
    flexGrow: 1,
});

const Submenu = styled('ul')(({ isVisible }) => ({
    display: isVisible ? 'block' : 'none',
    paddingLeft: 20,
    listStyle: 'none',
}));

const sidebarItems = [
    {
        icon: <FaUserCog />,
        label: 'Administração',
        to: '/management',
        submenu: [
            { label: 'Usuários', to: '/management/user-management' },
            { label: 'Permissões', to: '/management/permissions' }
        ]
    },
    {
        icon: <FaDatabase />,
        label: 'Gestão de Dados',
        to: '/management/data-management',
        submenu: [
            { label: 'Banco de Dados', to: '/management/database' },
            { label: 'Importação', to: '/management/import' }
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
    const [openSubmenus, setOpenSubmenus] = useState({});

    const toggleSidebarVisibility = (visible) => {
        if (!locked) setIsSidebarVisible(visible);
    };

    const toggleSubmenu = (index) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
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
                            <SidebarItem key={index} onClick={() => toggleSubmenu(index)}>
                                <SidebarIcon>{item.icon}</SidebarIcon>
                                {isSidebarVisible && <SidebarLabel>{item.label}</SidebarLabel>}
                                {item.submenu && (
                                    <Submenu isVisible={openSubmenus[index]}>
                                        {item.submenu.map((subItem, subIndex) => (
                                            <SidebarItem key={subIndex}>
                                                <SidebarIcon>{subItem.icon}</SidebarIcon>
                                                <SidebarLabel>{subItem.label}</SidebarLabel>
                                            </SidebarItem>
                                        ))}
                                    </Submenu>
                                )}
                            </SidebarItem>
                        ))}
                    </SidebarList>
                </Sidebar>
            </div>
            <MainContent isSidebarVisible={isSidebarVisible}>{children}</MainContent>
        </SidebarContainer>
    );
};

export default SidebarComponent;