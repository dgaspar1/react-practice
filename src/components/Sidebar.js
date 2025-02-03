import React, { useState, useEffect } from 'react';
import { FaUserCog, FaCalendarAlt, FaTools, FaMoneyBillWave, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const SidebarContainer = styled('div')({
    display: 'flex',
    height: '100vh',
});

const Sidebar = styled('div')(({ isSidebarVisible }) => ({
    marginTop: '35px',
    width: isSidebarVisible ? 175 : 60,
    backgroundColor: '#232F3E',
    color: '#ffffff',
    height: '100vh',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: 'width 0.3s ease',
    boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
    fontSize: '12px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#555 #232F3E',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': { background: '#555', borderRadius: '4px' },
    '&::-webkit-scrollbar-track': { background: '#232F3E' }
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
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#37475A',
    }
});

const SidebarIcon = styled('span')({
    fontSize: '20px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
});

const SidebarLabel = styled(Link)({
    textDecoration: 'none',
    color: 'white',
    whiteSpace: 'nowrap',
    '&:hover': {
        color: '#FFD700',
    },
});

const Submenu = styled('ul')(({ isVisible }) => ({
    display: isVisible ? 'block' : 'none',
    paddingLeft: 25,
    listStyle: 'none',
}));

const SidebarComponent = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [locked, setLocked] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});

    useEffect(() => {
        const savedState = localStorage.getItem('openSubmenus');
        if (savedState) {
            setOpenSubmenus(JSON.parse(savedState));
        }
    }, []);

    const toggleSidebarVisibility = (visible) => {
        if (!locked) {
            if (!visible) {
                localStorage.setItem('openSubmenus', JSON.stringify(openSubmenus));
                setOpenSubmenus({}); // Fecha os submenus ao ocultar o sidebar
            } else {
                const savedState = localStorage.getItem('openSubmenus');
                if (savedState) {
                    setOpenSubmenus(JSON.parse(savedState)); // Recupera o estado salvo
                }
            }
            setIsSidebarVisible(visible);
        }
    };

    const toggleSubmenu = (index) => {
        setOpenSubmenus((prev) => {
            const newState = { ...prev, [index]: !prev[index] };
            localStorage.setItem('openSubmenus', JSON.stringify(newState)); // Salva estado
            return newState;
        });
    };

    const sidebarItems = [
        {
            icon: <FaUserCog />, label: 'Administração', to: '/management',
            submenu: [{ label: 'Gestão de usuários', to: '/management/user' }]
        },
        {
            icon: <FaShoppingCart />, label: 'Suprimentos', to: '/procurement',
            submenu: [
                { label: 'Contratos', to: '/procurement/contract' },
                { label: 'Centro de custos', to: '/procurement/cost-center' },
                { label: 'Produtos', to: '/procurement/product' },
                { label: 'Serviços', to: '/procurement/service' },
                { label: 'Fornecedores', to: '/procurement/supplier' },
                { label: 'Relatórios', to: '/procurement/reports' }
            ]
        },
        {
            icon: <FaChartLine />, label: 'Vendas', to: '/sales',
            submenu: [
                { label: 'Pedidos', to: '/sale-order' },
                { label: 'Propostas', to: '/sale-proposal' },
                { label: 'Acompanhamento', to: '/track' },
                { label: 'Relatórios', to: '/sales-report' }
            ]
        },
        {
            icon: <FaTools />, label: 'Manutenção', to: '/maintenance',
            submenu: [
                { label: 'Equipamentos', to: '/equipments' },
                { label: 'Ordem de manutenção', to: '/maintenance-order' },
                { label: 'Roteiros', to: '/script' },
                { label: 'Histórico', to: '/history' },
                { label: 'Relatórios', to: '/maintenance-report' }
            ]
        },
        {
            icon: <FaMoneyBillWave />, label: 'Financeiro', to: '/financial',
            submenu: [
                { label: 'Fluxo', to: '/flow' },
                { label: 'Pagamentos', to: '/payment' },
                { label: 'Recebimentos', to: '/receive' }
            ]
        },
        {
            icon: <FaCalendarAlt />, label: 'Agenda', to: '/schedule'
        }
    ];

    return (
        <SidebarContainer>
            <div
            // onMouseEnter={() => !locked && toggleSidebarVisibility(true)}
            // onMouseLeave={() => !locked && toggleSidebarVisibility(false)}
            >
                <Sidebar isSidebarVisible={isSidebarVisible}>
                    <SidebarList>
                        {sidebarItems.map((item, index) => (
                            <SidebarItemWrapper key={index}>
                                <SidebarItem onClick={() => item.submenu && toggleSubmenu(index)}>
                                    <SidebarIcon>{item.icon}</SidebarIcon>
                                    {isSidebarVisible && <SidebarLabel to={item.to}>{item.label}</SidebarLabel>}
                                </SidebarItem>
                                {item.submenu && (
                                    <Submenu isVisible={isSidebarVisible && openSubmenus[index]}>
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
            <main style={{ marginLeft: isSidebarVisible ? '175px' : '60px', transition: 'margin-left 0.3s ease', padding: '10px' }}>
                {children}
            </main>
        </SidebarContainer>
    );
};

export default SidebarComponent;
