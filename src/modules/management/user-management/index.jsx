import React, { useState } from 'react';
import { styled } from '@mui/system';
import Breadcrumb from '../../../components/Breadcrumb';

const Container = styled('div')({
    padding: '20px',
    marginTop: '20px',
    fontFamily: 'Poppins, sans-serif',
});

const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px', // Ajustado para reduzir o espaço excessivo
});

const ButtonGroup = styled('div')({
    display: 'flex',
    gap: '5px',
});

const SelectionInfo = styled('p')({
    marginTop: '5px', // Ajuste fino para reduzir ainda mais o espaço
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
});

const Table = styled('table')({
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
});

const Th = styled('th')({
    borderBottom: '1px solid #aaa',
    padding: '8px',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '14px',
    color: '#333',
});

const Td = styled('td')({
    borderBottom: '1px solid #ddd',
    padding: '7px',
    fontSize: '12px',
    color: '#555',
});

const Button = styled('button')(({ disabled }) => ({
    padding: '6px 10px',
    border: '1px solid #007bff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: disabled ? '#e0e0e0' : 'transparent',
    color: disabled ? '#a0a0a0' : '#007bff',
    borderRadius: '3px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    '&:hover': !disabled && {
        backgroundColor: '#007bff',
        color: 'white',
    }
}));

const UserReport = () => {
    const [users, setUsers] = useState([
        { id: 1, companyId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { id: 2, companyId: '456', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    ]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSelectUser = (user) => {
        setSelectedUsers((prev) =>
            prev.includes(user.id) ? prev.filter((id) => id !== user.id) : [...prev, user.id]
        );
    };

    const handleCreate = () => {
        alert('Criar novo usuário');
    };

    const handleEdit = () => {
        if (selectedUsers.length === 1) {
            alert(`Editar usuário ${selectedUsers[0]}`);
        }
    };

    const handleDelete = () => {
        if (selectedUsers.length > 0) {
            setUsers(users.filter(user => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
        }
    };

    return (
        <Container>
            <Breadcrumb />
            <Header>
                <h3 style={{ fontSize: '18px', color: '#333' }}>
                    Relatório de Usuários ({users.length})
                </h3>
                <ButtonGroup>
                    <Button onClick={handleCreate}>Criar</Button>
                    <Button onClick={handleEdit} disabled={selectedUsers.length !== 1}>Editar</Button>
                    <Button onClick={handleDelete} disabled={selectedUsers.length === 0} style={{ borderColor: 'red', color: selectedUsers.length === 0 ? '#a0a0a0' : 'red' }}>
                        Deletar
                    </Button>
                </ButtonGroup>    
            </Header>
            <SelectionInfo>{selectedUsers.length > 0 ? `${selectedUsers.length} linha(s) selecionada(s)` : 'Nenhuma linha selecionada'}</SelectionInfo>
            <Table>
                <thead>
                    <tr>
                        <Th>Empresa</Th>
                        <Th>Primeiro Nome</Th>
                        <Th>Último Nome</Th>
                        <Th>Email</Th>
                        <Th>Telefone</Th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} onClick={() => handleSelectUser(user)} style={{ backgroundColor: selectedUsers.includes(user.id) ? '#f9f9f9' : 'transparent', cursor: 'pointer' }}>
                            <Td>{user.companyId}</Td>
                            <Td>{user.firstName}</Td>
                            <Td>{user.lastName}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.phone}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserReport;
