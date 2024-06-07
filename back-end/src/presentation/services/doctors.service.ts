import { DoctorModel } from '../../database/mongo';
import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class DoctorsService {
	public async getAllDoctors() {
		try {
			const doctors = await DoctorModel.find();

			return {
				doctors,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
}
