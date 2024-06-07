import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { QuotesService } from '../services/quotes.service';
import { QuotesController } from './controller';

export class QuotesRoutes {
	static get routes() {
		const router = Router();

		const quotesService = new QuotesService();
		const quotesController = new QuotesController(quotesService);

		//* Todas las rutas tengan la verificacion
		router.use(AuthMiddleware.verifyToken);

		router.get('/', quotesController.getQuotes);
		router.post('/new', quotesController.createQuote);
		router.put('/:id', quotesController.updateQuote);
		router.delete('/:id', quotesController.deleteQuote);

		return router;
	}
}
