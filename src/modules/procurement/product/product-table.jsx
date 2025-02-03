import React, { useState } from 'react';
import { styled } from '@mui/system';
import Breadcrumb from '../../../components/Breadcrumb'; // Importando o Breadcrumb
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Container = styled('div')({
    padding: '20px',
    marginTop: '20px',
    fontFamily: 'Poppins, sans-serif',
});

const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
});

const ButtonGroup = styled('div')({
    display: 'flex',
    gap: '10px',
});

const Button = styled('button')(({ disabled }) => ({
    padding: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: disabled ? '#e0e0e0' : '#007bff',
    color: 'white',
    fontSize: '14px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    '&:hover': !disabled && {
        backgroundColor: '#0056b3',
    },
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
    marginTop: '20px',
});

const Th = styled('th')({
    borderBottom: '1px solid #aaa',
    padding: '8px',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#f9f9f9',
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

const ProductTable = ({ products, onAdd, onEdit, onDelete }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSelectProduct = (product) => {
        setSelectedProducts((prev) =>
            prev.includes(product.code)
                ? prev.filter((code) => code !== product.code)
                : [...prev, product.code]
        );
    };

    const handleRowClick = (product) => {
        handleSelectProduct(product);
    };

    return (
        <Container>
            {/* Adicionando o Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Gestão de Produtos', path: '/products' },
                ]}
            />

            <Header>
                <h3 style={{ fontSize: '18px', color: '#333' }}>
                    Lista de Produtos ({products.length})
                </h3>
                <ButtonGroup>
                    <Button onClick={onAdd}>
                        <FaPlus /> Adicionar
                    </Button>
                    <Button
                        onClick={() => onEdit(selectedProducts[0])}
                        disabled={selectedProducts.length !== 1}
                    >
                        <FaEdit /> Editar
                    </Button>
                    <Button
                        onClick={() => onDelete(selectedProducts)}
                        disabled={selectedProducts.length === 0}
                        style={{
                            backgroundColor: selectedProducts.length === 0 ? '#e0e0e0' : 'red',
                        }}
                    >
                        <FaTrash /> Remover
                    </Button>
                </ButtonGroup>
            </Header>

            <SelectionInfo>
                {selectedProducts.length > 0
                    ? `${selectedProducts.length} produto(s) selecionado(s)`
                    : 'Nenhum produto selecionado'}
            </SelectionInfo>

            <Table>
                <thead>
                    <tr>
                        <Th></Th>
                        <Th>Código</Th>
                        <Th>Descrição</Th>
                        <Th>Preço</Th>
                        <Th>Estoque</Th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.code} onClick={() => handleRowClick(product)}>
                            <Td>
                                <Checkbox
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.code)}
                                    onChange={() => handleSelectProduct(product)}
                                />
                            </Td>
                            <Td>{product.code}</Td>
                            <Td>{product.description}</Td>
                            <Td>{product.price.toFixed(2)}</Td>
                            <Td>{product.stock}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProductTable;
