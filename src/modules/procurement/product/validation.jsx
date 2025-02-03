import { z } from 'zod';

// Esquema de validação para o produto
export const productSchema = z.object({
    code: z.string().min(1, "Código é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
    stock: z.number().int("Estoque deve ser um número inteiro").min(0, "Estoque não pode ser negativo"),
});

// Função utilitária para validação
export const validateProduct = (data) => {
    return productSchema.safeParse(data);
};
