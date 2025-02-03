import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable from '../../../components/GenericTable';
import Breadcrumb from '../../../components/Breadcrumb';

const SupplierManagement = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'Fornecedor A', email: 'contato@a.com', phone: '1234-5678' },
        { id: 2, name: 'Fornecedor B', email: 'contato@b.com', phone: '9876-5432' },
    ]);

    const handleAdd = () => {
        navigate('/procurement/supplier/form'); // Navega para criação
    };

    const handleEdit = (id) => {
        navigate(`/procurement/supplier/form/${id}`); // Navega para edição
    };

    const handleDelete = (ids) => {
        setSuppliers((prev) => prev.filter((supplier) => !ids.includes(supplier.id)));
    };

    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Gestão de Fornecedores', path: '/procurement/supplier' },
                ]}
            />

            {/* Instanciando GenericTable */}
            <GenericTable
                title="Gestão de Fornecedores"
                columns={[
                    { key: 'name', label: 'Nome' },
                    { key: 'email', label: 'E-mail' },
                    { key: 'phone', label: 'Telefone' },
                ]}
                data={suppliers}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={(supplier) => handleEdit(supplier.id)} // Agora a navegação é dinâmica!
            />
        </div>
    );
};

export default SupplierManagement;
