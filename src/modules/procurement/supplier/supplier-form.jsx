import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supplierSchema } from './validation'; // Validação específica para fornecedores
import Breadcrumb from '../../../components/Breadcrumb';
import GenericForm from '../../../components/GenericForm';

// Campos do formulário
const supplierFields = [
    // Aba: Dados Gerais
    { name: 'name', label: 'Nome/Razão Social', placeholder: 'Digite o nome ou razão social', category: 'general' },
    { name: 'fantasyName', label: 'Nome Fantasia', placeholder: 'Digite o nome fantasia', category: 'general' },
    { name: 'personType', label: 'Tipo de Pessoa', type: 'select', options: ['Física', 'Jurídica'], category: 'general' },

    // Aba: Contatos (único)
    { name: 'phone', label: 'Telefone', placeholder: 'Digite o telefone', category: 'contact' },
    { name: 'email', label: 'E-mail', placeholder: 'Digite o e-mail', category: 'contact' },

    // Aba: Pessoas de Contato (múltiplo)
    {
        name: 'contactPersons',
        label: 'Pessoas de Contato',
        category: 'people',
        isMultiple: true,  // Permite múltiplos registros
        fields: [
            { name: 'contactName', label: 'Nome', placeholder: 'Digite o nome do contato' },
            { name: 'department', label: 'Setor', placeholder: 'Digite o setor' },
            { name: 'contactEmail', label: 'E-mail', placeholder: 'Digite o e-mail do contato' },
            { name: 'contactPhone', label: 'Telefone', placeholder: 'Digite o telefone do contato' },
        ],
    },

    // Aba: Endereço (único)
    { name: 'zipcode', label: 'CEP', placeholder: 'Digite o CEP', category: 'address' },
    { name: 'city', label: 'Município', placeholder: 'Digite o município', category: 'address' },
    { name: 'state', label: 'UF', type: 'select', options: ['SP', 'RJ', 'MG', 'PR'], category: 'address' },

    // Aba: Dados Complementares
    { name: 'paymentCondition', label: 'Condição de Pagamento', placeholder: 'Digite a condição', category: 'additional' },
    { name: 'creditLimit', label: 'Limite de Crédito', type: 'decimal', placeholder: 'Digite o limite de crédito', category: 'additional' },
];



const SupplierForm = ({ onSave }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura o ID da URL
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        if (id) {
            // Simulação de carregamento dos dados do fornecedor (substituir com API real)
            const supplierData = {
                id,
                name: 'Fornecedor Teste',
                fantasyName: 'Fantasia Teste',
                personType: 'Jurídica',
                taxpayer: 'Sim',
                stateRegistration: '123456789',
                contactType: 'Fornecedor',
                zipcode: '12345-678',
                city: 'São Paulo',
                state: 'SP',
                address: 'Rua Exemplo',
                district: 'Centro',
                number: '100',
                complement: 'Sala 202',
                billingAddressDifferent: false,
                phone: '11 99999-9999',
                additionalPhone: '',
                mobile: '11 98888-8888',
                website: 'www.exemplo.com',
                email: 'contato@exemplo.com',
                emailNfe: 'financeiro@exemplo.com',
                contactNotes: 'Fornecedor ativo',
                contactPerson: 'João Silva',
                department: 'Compras',
                contactEmail: 'joao@exemplo.com',
                contactPhone: '11 99999-8888',
                extension: '201',
                paymentCondition: '30 dias',
                creditLimit: 50000,
                attachments: '',
                notes: 'Observação qualquer'
            };
            setInitialData(supplierData);
        }
    }, [id]);

    const handleSave = (data) => {
        console.log('Fornecedor salvo:', data);
        onSave(data);
        navigate('/procurement/supplier'); // Retorna para a lista de fornecedores após salvar
    };

    return (
        <div>
            {/* Breadcrumb Mantido */}
            <Breadcrumb
                items={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Gestão de Fornecedores', path: '/procurement/supplier' },
                    { label: id ? 'Editar Fornecedor' : 'Novo Fornecedor', path: `/procurement/supplier/form/${id || ''}` },
                ]}
            />

            <GenericForm
                title={id ? 'Editar Fornecedor' : 'Novo Fornecedor'}
                schema={supplierSchema}
                fields={supplierFields}
                onSave={handleSave}
                onCancel={() => navigate('/procurement/supplier')}
                initialData={initialData}
            />
        </div>
    );
};

export default SupplierForm;
