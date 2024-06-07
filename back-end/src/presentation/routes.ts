import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { QuotesRoutes } from './quotes/routes';
import { DoctorsRoutes } from './doctors/routes';

export class AppRoutes {
	static get routes() {
		const router = Router();

		router.use('/api/auth', AuthRoutes.routes);
		router.use('/api/quotes', QuotesRoutes.routes);
		router.use('/api/doctors',DoctorsRoutes.routes);

		return router;
	}
}
