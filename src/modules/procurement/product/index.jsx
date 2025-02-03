import React, { useState } from 'react';
import GenericTable from '../../../components/GenericTable';
import Breadcrumb from '../../../components/Breadcrumb';

import { useNavigate } from 'react-router-dom';


const ProductManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        { id: 1, code: 'P001', description: 'Produto 1', price: 10.0, stock: 100 },
        { id: 2, code: 'P002', description: 'Produto 2', price: 20.0, stock: 50 },
        { id: 3, code: 'P003', description: 'Produto 3', price: 15.5, stock: 30 },
    ]);

    const handleAdd = () => {
        navigate('/procurement/product/form'); // Navega para o formulário sem dados iniciais (criação)
    };

    const handleEdit = (id) => {
        alert(`Editar produto com ID: ${id}`);
    };

    const handleDelete = (ids) => {
        setProducts((prev) => prev.filter((product) => !ids.includes(product.id)));
    };

    return (
        <div>
            {/* Breadcrumb no nível da página */}
            <Breadcrumb
                items={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Gestão de produtos', path: '/procurement/product' },
                ]}
            />

            {/* Componente de tabela genérica */}
            <GenericTable
                title="Gestão de produtos"
                columns={[
                    { key: 'code', label: 'Código' },
                    { key: 'description', label: 'Descrição' },
                    { key: 'price', label: 'Preço' },
                    { key: 'stock', label: 'Estoque' },
                ]}
                data={products}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ProductManagement;
