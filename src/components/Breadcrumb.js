import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import routeMapping from './RouteMapping';

const BreadcrumbContainer = styled('nav')({
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
    fontFamily: 'Poppins, sans-serif',
});

const BreadcrumbList = styled('ul')({
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontSize: '14px',
});

const BreadcrumbItem = styled('li')({
    marginRight: '10px',
    '&:after': {
        content: '" > "',
        marginLeft: '10px',
        color: '#555',
    },
    '&:last-child:after': {
        content: '""',
    },
});

const BreadcrumbLink = styled(Link)({
    textDecoration: 'none',
    color: '#007bff',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <BreadcrumbContainer>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink to="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <BreadcrumbItem key={to}>
                            {index === pathnames.length - 1 ? (
                                <span>{routeMapping[value] || value.replace('-', ' ')}</span>
                            ) : (
                                <BreadcrumbLink to={to}>{routeMapping[value] || value.replace('-', ' ')}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;
