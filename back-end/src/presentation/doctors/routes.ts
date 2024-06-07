import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DoctorsService } from '../services/doctors.service';
import { DoctorsController } from './controller';

export class DoctorsRoutes {
	static get routes() {
		const router = Router();

		const doctorsService = new DoctorsService();
		const doctorsController = new DoctorsController(doctorsService);

		//* Todas las rutas tengan la verificacion
		router.use(AuthMiddleware.verifyToken);

		router.get('/',doctorsController.getDoctors);

		return router;
	}
}
