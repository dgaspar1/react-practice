import React from 'react';
import { styled } from '@mui/system';

const Card = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  border: '1px solid #BDC3C7',
  fontFamily: '"Open Sans", sans-serif',
});

const CardTitle = styled('h2')({
  marginBottom: 10,
  fontSize: '20px',
  color: '#2C3E50',
  fontFamily: '"Poppins", sans-serif',
});

const CardApps = ({ title, children }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {children}
    </Card>
  );
};

export default CardApps;
