import React, { useState } from 'react';
import { FaUserCog, FaDatabase, FaChartBar } from 'react-icons/fa';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const Sidebar = styled('div')({
  width: 45,
  backgroundColor: '#2C3E50',
  color: 'white',
  height: '100vh',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '"Open Sans", sans-serif',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: 'width 0.3s ease',
});

const SidebarTitle = styled('h2')({
  marginBottom: 20,
  textAlign: 'center',
  fontSize: '24px',
  color: '#F39C12',
  fontFamily: '"Poppins", sans-serif',
  transition: 'opacity 0.3s ease',
});

const SidebarList = styled('ul')({
  padding: 0,
  marginTop: 20,
});

const SidebarItem = styled('li')({
  margin: '15px 0',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#34495E',
    paddingLeft: 10,
    borderRadius: 5,
  },
  fontFamily: '"Roboto", sans-serif',
  transition: 'padding-left 0.3s ease',
});

const SidebarIcon = styled('span')({
  fontSize: '20px',
  width: 40, // Alinhamento centralizado
  textAlign: 'center',
});

const SidebarLabel = styled('span')({
  marginLeft: 10,
  transition: 'opacity 0.3s ease',
  whiteSpace: 'nowrap',
});

const sidebarItems = [
  { icon: <FaUserCog />, label: 'Administração de usuários', to: '/management/user-management' },
  { icon: <FaDatabase />, label: 'Gestão de dados', to: '/management/data-management' },
  { icon: <FaChartBar />, label: 'Vendas', to: '/sales' },
];

const SidebarComponent = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebarVisibility = (visible) => {
    setIsSidebarVisible(visible);
  };

  return (
    <div
      onMouseEnter={() => toggleSidebarVisibility(true)}
      onMouseLeave={() => toggleSidebarVisibility(false)}
      style={{ position: 'relative' }}
    >
      <Sidebar
        style={{
          width: isSidebarVisible ? 300 : 45, // Reduz o tamanho da barra lateral
        }}
      >
        <SidebarTitle style={{ opacity: isSidebarVisible ? 1 : 0 }}>Menu</SidebarTitle>
        <SidebarList>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index}>
              <SidebarIcon>{item.icon}</SidebarIcon>
              <SidebarLabel style={{ opacity: isSidebarVisible ? 1 : 0 }}>
                <Link
                  to={item.to}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                  }}
                >
                  {item.label}
                </Link>
              </SidebarLabel>
            </SidebarItem>
          ))}
        </SidebarList>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
