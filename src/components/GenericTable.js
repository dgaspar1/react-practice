import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Container = styled('div')({
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
    cursor: 'pointer',
});

const Checkbox = styled('input')({
    cursor: 'pointer',
});

const GenericTable = ({ title, columns, data, onAdd, onEdit, onDelete, onRowClick }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    const handleSelectItem = (item) => {
        setSelectedItems((prev) =>
            prev.includes(item.id)
                ? prev.filter((id) => id !== item.id)
                : [...prev, item.id]
        );
    };

    const handleRowClick = (item) => {
        if (onRowClick) {
            onRowClick(item); // Agora a navegação é configurável via props
        }
    };

    return (
        <Container>
            {/* Header */}
            <Header>
                <h3 style={{ fontSize: '18px', color: '#333' }}>
                    {title} ({data.length})
                </h3>
                <ButtonGroup>
                    <Button onClick={onAdd}>
                        <FaPlus /> Adicionar
                    </Button>
                    <Button
                        onClick={() => onEdit(selectedItems[0])}
                        disabled={selectedItems.length !== 1}
                    >
                        <FaEdit /> Editar
                    </Button>
                    <Button
                        onClick={() => onDelete(selectedItems)}
                        disabled={selectedItems.length === 0}
                        style={{
                            backgroundColor: selectedItems.length === 0 ? '#e0e0e0' : 'red',
                        }}
                    >
                        <FaTrash /> Remover
                    </Button>
                </ButtonGroup>
            </Header>

            {/* Anotação de seleção */}
            <SelectionInfo>
                {selectedItems.length > 0
                    ? `${selectedItems.length} item(s) selecionado(s)`
                    : 'Nenhum item selecionado'}
            </SelectionInfo>

            {/* Tabela */}
            <Table>
                <thead>
                    <tr>
                        <Th></Th>
                        {columns.map((col) => (
                            <Th key={col.key}>{col.label}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} onClick={() => handleRowClick(item)}>
                            <Td>
                                <Checkbox
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleSelectItem(item);
                                    }}
                                    onClick={(e) => e.stopPropagation()} // Evita navegação ao clicar no checkbox
                                />
                            </Td>
                            {columns.map((col) => (
                                <Td key={col.key}>{item[col.key]}</Td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default GenericTable;
