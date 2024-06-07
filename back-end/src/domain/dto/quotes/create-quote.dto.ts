import { Validations } from '../../../config';

export class CreateQuoteDto {
	private constructor(
		public readonly name: string,
		public readonly lastname: string,
		public readonly doctor: string,
		public readonly reason: string,
		public readonly active: boolean,
		public readonly createAt: Date,
		public readonly endAt: Date
	) {}

	static create(object: { [key: string]: any }): [string?, CreateQuoteDto?] {
		const {
			name,
			lastname,
			doctor,
			reason,
			active = true,
			createAt = new Date(),
			endAt,
		} = object;

		let activeBoolean = active;

		if (!name) return ['El nombre es requerido'];
		if (!lastname) return ['La descripción es requerida'];
		if (!doctor) return ['El doctor es requerido'];
		if (!reason) return ['La razón es requerida'];
		if (!createAt) return ['La fecha de inicio es requerida'];
		if (!endAt) return ['La fecha de finalización es requerida'];

		if (typeof active !== 'boolean') {
			activeBoolean = active === 'true';
		}

		if (!Validations.isMongoID(doctor)) return ['ID doctor invalido'];

		return [
			undefined,
			new CreateQuoteDto(
				name,
				lastname,
				doctor,
				reason,
				activeBoolean,
				createAt,
				endAt
			),
		];
	}
}
