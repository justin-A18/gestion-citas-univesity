import { CustomError } from '../errors';

export class DoctorEntity {
	constructor(
		public id: string,
		public fullname: string,
		public description: string
	) {}

	static fromObject(object: { [key: string]: any }): DoctorEntity {
		const { id, _id, fullname, description } = object;

		if (!_id && !id) throw CustomError.badRequest('Missing id');

		if (!fullname) throw CustomError.badRequest('Missing fullname');
		if (!description) throw CustomError.badRequest('Missing description');

		return new DoctorEntity(_id || id, fullname, description);
	}
}
