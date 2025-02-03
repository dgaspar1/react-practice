import React from 'react';
import { z } from 'zod';
import GenericForm from '../../../components/GenericForm';

// Esquema de validação para usuários
const userSchema = z.object({
    firstName: z.string().min(1, 'Primeiro nome é obrigatório'),
    lastName: z.string().min(1, 'Último nome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Número de telefone inválido'),
});

// Configuração dos campos
const userFields = [
    { name: 'firstName', label: 'Primeiro Nome', placeholder: 'Digite o primeiro nome' },
    { name: 'lastName', label: 'Último Nome', placeholder: 'Digite o último nome' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite o email' },
    { name: 'phone', label: 'Telefone', placeholder: 'Digite o número de telefone' },
];

const UserForm = ({ onSave, onCancel, initialData }) => {
    return (
        <GenericForm
            schema={userSchema}
            fields={userFields}
            onSave={onSave}
            onCancel={onCancel}
            initialData={initialData}
        />
    );
};

export default UserForm;
