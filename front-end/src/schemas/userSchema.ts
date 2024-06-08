import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({
		message: 'Por favor ingrese un email valido',
	}),
	password: z
		.string()
		.min(6, {
			message: 'La contraseña deber tener minimo 6 caracteres',
		})
		.max(50, {
			message: 'La contraseña deber tener maximo 50 caracteres',
		}),
});

