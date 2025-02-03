import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable from '../../../components/GenericTable';
import Breadcrumb from '../../../components/Breadcrumb';

const UserReport = () => {
    const [users, setUsers] = useState([
        { id: 1, companyId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', createdAt: '2024-05-01', createdBy: 'admin@example.com' },
        { id: 2, companyId: '456', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', createdAt: '2024-05-02', createdBy: 'admin@example.com' },
    ]);

    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/management/user-form'); // Navega para o formulário sem dados iniciais (criação)
    };

    const handleEdit = (id) => {
        const selectedUser = users.find((user) => user.id === id);
        if (selectedUser) {
            navigate('/users/form', { state: { user: selectedUser } }); // Passa os dados do usuário via state
        }
    };

    const handleDelete = (ids) => {
        setUsers((prev) => prev.filter((user) => !ids.includes(user.id)));
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Relatório de Usuários', path: '/users' },
                ]}
            />
            <GenericTable
                title="Relatório de Usuários"
                columns={[
                    { key: 'companyId', label: 'Empresa' },
                    { key: 'firstName', label: 'Primeiro Nome' },
                    { key: 'lastName', label: 'Último Nome' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Telefone' },
                    { key: 'createdAt', label: 'Data de Criação' },
                    { key: 'createdBy', label: 'Autor da Criação' },
                ]}
                data={users}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default UserReport;
