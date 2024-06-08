import { z } from 'zod';

export const quoteSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'El nombre es obligatorio',
		})
		.max(50, {
			message: 'El nombre deber tener maximo 50 caracteres',
		}),
	lastname: z
		.string()
		.min(2, {
			message: 'El apellido es obligatorio',
		})
		.max(50, {
			message: 'El apellido deber tener maximo 50 caracteres',
		}),
	doctor: z.string({
		required_error: 'Por favor selecciona un doctor',
	}),
	reason: z
		.string()
		.min(30, {
			message: 'El motivo debe tener minimo 30 caracteres',
		})
		.max(250, {
			message: 'El motivo deber tener maximo 250 caracteres',
		}),
	createAt: z.date({
		message: 'Ingrese una fecha valida',
	}),
	endAt: z.date({
		message: 'Ingrese una fecha valida',
	}),
});
