import { CustomError } from '../errors';
import { UserEntity } from './user.entity';

export class QuoteEntity {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly lastname: string,
		public readonly doctor: UserEntity,
		public readonly reason: string,
		public readonly active: boolean,
		public readonly createAt: Date,
		public readonly endAt: Date
	) {}

	static fromObject(object: { [key: string]: any }): QuoteEntity {
		const { id, name, lastname, doctor, reason, active, createAt, endAt } =
			object;

		if (!id) throw CustomError.badRequest('Missing name');
		if (!name) throw CustomError.badRequest('Missing name');
		if (!lastname) throw CustomError.badRequest('Missing lastname');
		if (!doctor) throw CustomError.badRequest('Missing doctor');
		if (!reason) throw CustomError.badRequest('Missing reason');
		if (!active) throw CustomError.badRequest('Missing active');

		if (!createAt) throw CustomError.badRequest('Missing createAt');
		if (!endAt) throw CustomError.badRequest('Missing endAt');

		return new QuoteEntity(
			id,
			name,
			lastname,
			doctor,
			reason,
			active,
			createAt,
			endAt
		);
	}
}
