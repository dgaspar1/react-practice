import React, { useState } from 'react';
import { styled } from '@mui/system';
import { FaPlus, FaTrash } from 'react-icons/fa';

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
    marginTop: '10px',
    justifyContent: 'space-between',
});

const Button = styled('button')(({ primary }) => ({
    padding: '10px 20px',
    backgroundColor: primary ? '#007bff' : '#aaa',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: primary ? '#0056b3' : '#888',
    },
}));

const Title = styled('h2')({
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
});

const TabsContainer = styled('div')({
    display: 'flex',
    borderBottom: '2px solid #ddd',
    marginBottom: '15px',
});

const Tab = styled('button')(({ active }) => ({
    padding: '10px 15px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: active ? '#007bff' : 'transparent',
    color: active ? 'white' : '#333',
    fontSize: '14px',
    borderBottom: active ? '3px solid #007bff' : 'none',
    '&:hover': {
        backgroundColor: active ? '#0056b3' : '#f0f0f0',
    },
}));

const FieldsRow = styled('div')({
    display: 'flex',
    alignItems: 'flex-end', // Garante que os botões e os inputs fiquem alinhados
    marginBottom: '10px',
});


const FieldContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '5px'
});

const Label = styled('label')({
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
});

const Input = styled('input')({
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
});


const MultipleFieldContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginRight: '90px',
    marginTop: '10px'
});

const MultipleInput = styled('input')({
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
});
const RemoveRowButton = styled(Button)({
    backgroundColor: 'red',
    height: '38px', // Mesmo tamanho dos inputs
    alignItems: 'center', // Centraliza o ícone no botão
    '&:hover': {
        backgroundColor: '#b30000',
    },
});

const ErrorText = styled('span')({
    color: 'red',
    fontSize: '12px',
});

const AddRowButton = styled(Button)({
    backgroundColor: '#28a745',
    '&:hover': {
        backgroundColor: '#218838',
    },
});


const GenericForm = ({ title, schema, fields, onSave, onCancel, initialData = {} }) => {
    const [formData, setFormData] = useState(() => {
        const initial = {};
        fields.forEach((field) => {
            if (field.isMultiple) {
                initial[field.name] = Array.isArray(initialData[field.name]) ? initialData[field.name] : [{}];
            } else {
                initial[field.name] = initialData[field.name] || '';
            }
        });
        return initial;
    });


    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState(0);

    // Agrupar campos por categorias
    const sections = {
        "Dados Gerais": fields.filter(f => f.category === "general"),
        "Endereço": fields.filter(f => f.category === "address"),
        "Contato": fields.filter(f => f.category === "contact"),
        "Pessoas de Contato": fields.filter(f => f.category === "people"),
        "Dados Complementares": fields.filter(f => f.category === "additional"),
    };

    const handleInputChange = (name, value, index = null) => {
        setFormData((prev) => {
            const updated = { ...prev };
            if (index !== null) {
                updated[name][index] = { ...updated[name][index], ...value };
            } else {
                updated[name] = value;
            }
            return updated;
        });
    };

    const handleSubmit = () => {
        const result = schema.safeParse(formData);
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
        } else {
            setErrors({});
            onSave(result.data);
        }
    };

    const addRow = (fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: [...(prev[fieldName] || [{}]), {}],
        }));
    };

    const removeRow = (fieldName, index) => {
        setFormData((prev) => {
            if (!Array.isArray(prev[fieldName])) return prev;
            return {
                ...prev,
                [fieldName]: prev[fieldName].length > 1 ? prev[fieldName].filter((_, i) => i !== index) : [{}],
            };
        });
    };

    return (
        <Container>
            <Header>
                {title && <Title>{title}</Title>}
                <ButtonGroup>
                    <Button primary onClick={handleSubmit}>
                        Salvar
                    </Button>
                    <Button onClick={onCancel}>Cancelar</Button>
                </ButtonGroup>
            </Header>

            {/* Abas para navegação entre seções */}
            <TabsContainer>
                {Object.keys(sections).map((section, index) => (
                    <Tab key={index} active={index === activeTab} onClick={() => setActiveTab(index)}>
                        {section}
                    </Tab>
                ))}
            </TabsContainer>

            {/* Renderizando campos da aba ativa */}
            {Object.values(sections)[activeTab].map((field) => (
                <div key={field.name}>
                    {field.isMultiple ? (
                        <>
                            {formData[field.name].map((entry, index) => (
                                <FieldsRow key={index}>
                                    {field.fields.map((subField) => (
                                        <MultipleFieldContainer key={subField.name}>
                                            <Label htmlFor={`${field.name}-${subField.name}-${index}`}>{subField.label}:</Label>
                                            <MultipleInput
                                                id={`${field.name}-${subField.name}-${index}`}
                                                type={subField.type || 'text'}
                                                value={entry[subField.name] || ''}
                                                onChange={(e) =>
                                                    handleInputChange(field.name, { [subField.name]: e.target.value }, index)
                                                }
                                                placeholder={subField.placeholder || ''}
                                            />
                                        </MultipleFieldContainer>
                                    ))}
                                    {index > 0 && (
                                        <RemoveRowButton onClick={() => removeRow(field.name, index)}>
                                            <FaTrash />
                                        </RemoveRowButton>
                                    )}
                                </FieldsRow>
                            ))}
                            <AddRowButton onClick={() => addRow(field.name)}>
                                <FaPlus /> Adicionar
                            </AddRowButton>
                        </>
                    ) : (
                        <FieldContainer>
                            <Label htmlFor={field.name}>{field.label}:</Label>
                            <Input
                                id={field.name}
                                type={field.type || 'text'}
                                value={formData[field.name]}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={field.placeholder || ''}
                            />
                            {errors[field.name] && <ErrorText>{errors[field.name][0]}</ErrorText>}
                        </FieldContainer>
                    )}
                </div>
            ))}
        </Container>
    );
};

export default GenericForm;
