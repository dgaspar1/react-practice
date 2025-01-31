import React, { useState } from 'react';
import { styled } from '@mui/system';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
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
    marginBottom: '5px',
});

const ButtonGroup = styled('div')({
    display: 'flex',
    gap: '10px',
});

const Button = styled('button')(({ disabled }) => ({
    padding: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: 'transparent',
    color: disabled ? '#a0a0a0' : '#007bff',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    '&:hover': !disabled && {
        color: '#0056b3',
    }
}));

const SelectionInfo = styled('p')({
    marginTop: '5px',
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

const Checkbox = styled('input')({
    cursor: 'pointer',
});

const Input = styled('input')({
    width: '100%',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    fontSize: '12px',
});

const UserReport = () => {
    const [users, setUsers] = useState([
        { id: 1, companyId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', createdAt: '2024-05-01', createdBy: 'admin@example.com' },
        { id: 2, companyId: '456', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', createdAt: '2024-05-02', createdBy: 'admin@example.com' },
    ]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [newUser, setNewUser] = useState(null);

    const handleSelectUser = (user) => {
        setSelectedUsers((prev) =>
            prev.includes(user.id) ? prev.filter((id) => id !== user.id) : [...prev, user.id]
        );
    };

    const handleRowClick = (user) => {
        handleSelectUser(user);
    };

    const handleCreate = () => {
        setNewUser({ id: Date.now(), companyId: '', firstName: '', lastName: '', email: '', phone: '', createdAt: new Date().toISOString().split('T')[0], createdBy: 'admin@example.com' });
    };

    const handleSaveNewUser = () => {
        setUsers([newUser, ...users]);
        setNewUser(null);
    };

    const handleCancelNewUser = () => {
        setNewUser(null);
    };

    return (
        <Container>
            <Breadcrumb />
            <Header>
                <h3 style={{ fontSize: '18px', color: '#333' }}>
                    Relatório de Usuários ({users.length})
                </h3>
                <ButtonGroup>
                    <Button onClick={handleCreate}><FaPlus /> Novo</Button>
                    <Button onClick={() => alert('Editar funcionalidade futura')} disabled={selectedUsers.length !== 1}><FaEdit /> Editar</Button>
                    <Button onClick={() => alert('Remover funcionalidade futura')} disabled={selectedUsers.length === 0} style={{ color: selectedUsers.length === 0 ? '#a0a0a0' : 'red' }}>
                        <FaTrash /> Remover
                    </Button>
                </ButtonGroup>
            </Header>
            <SelectionInfo>{selectedUsers.length > 0 ? `${selectedUsers.length} linha(s) selecionada(s)` : 'Nenhuma linha selecionada'}</SelectionInfo>
            <Table>
                <thead>
                    <tr>
                        <Th></Th>
                        <Th>Empresa</Th>
                        <Th>Primeiro Nome</Th>
                        <Th>Último Nome</Th>
                        <Th>Email</Th>
                        <Th>Telefone</Th>
                        <Th>Data de Criação</Th>
                        <Th>Autor da Criação</Th>
                    </tr>
                </thead>
                <tbody>
                    {newUser && (
                        <tr>
                            <Td><Button onClick={handleSaveNewUser}><FaSave /></Button> <Button onClick={handleCancelNewUser}><FaTimes /></Button></Td>
                            <Td><Input value={newUser.companyId} onChange={(e) => setNewUser({ ...newUser, companyId: e.target.value })} /></Td>
                            <Td><Input value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} /></Td>
                            <Td><Input value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} /></Td>
                            <Td><Input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></Td>
                            <Td><Input value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} /></Td>
                            <Td>{newUser.createdAt}</Td>
                            <Td>{newUser.createdBy}</Td>
                        </tr>
                    )}
                    {users.map(user => (
                        <tr key={user.id} onClick={() => handleRowClick(user)}>
                            <Td>
                                <Checkbox type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user)} onClick={(e) => e.stopPropagation()} />
                            </Td>
                            <Td>{user.companyId}</Td>
                            <Td>{user.firstName}</Td>
                            <Td>{user.lastName}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.phone}</Td>
                            <Td>{user.createdAt}</Td>
                            <Td>{user.createdBy}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserReport;