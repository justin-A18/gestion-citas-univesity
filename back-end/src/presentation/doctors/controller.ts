import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { DoctorsService } from '../services/doctors.service';

export class DoctorsController {
	constructor(private readonly doctorsService: DoctorsService) {}

	private handleError(error: unknown, res: Response) {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}

		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	}

	getDoctors = (req: Request, res: Response) => {
		this.doctorsService
			.getAllDoctors()
			.then((doctors) => res.json(doctors))
			.catch((err) => this.handleError(err, res));
	};
}

