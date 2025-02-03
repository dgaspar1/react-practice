import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productSchema } from './validation';
import Breadcrumb from '../../../components/Breadcrumb';
import GenericForm from '../../../components/GenericForm';

const productFields = [
    { name: 'code', label: 'Código', placeholder: 'Digite o código do produto' },
    { name: 'description', label: 'Descrição', placeholder: 'Digite a descrição do produto' },
    { name: 'price', label: 'Preço', type: 'decimal', placeholder: 'Digite o preço' },
    { name: 'stock', label: 'Estoque', type: 'number', placeholder: 'Digite a quantidade em estoque' },
];

const ProductForm = ({ onSave, initialData = {} }) => {
    const navigate = useNavigate();

    const handleSave = (data) => {
        console.log('Produto salvo:', data);
        onSave(data);
        navigate('/procurement/product'); // Retorna para a lista de produtos após salvar
    };

    return (
        <div>
            {/* Breadcrumb Mantido */}
            <Breadcrumb
                items={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Gestão de Produtos', path: '/products' },
                    { label: initialData.code ? 'Editar Produto' : 'Novo produto', path: '/products/form' },
                ]}
            />
            <GenericForm
                title={initialData.code ? 'Editar Produto' : 'Novo produto'}
                schema={productSchema}
                fields={productFields}
                onSave={handleSave}
                onCancel={() => navigate('/procurement/product')}
                initialData={initialData}
            />
        </div>
    );
};

export default ProductForm;
