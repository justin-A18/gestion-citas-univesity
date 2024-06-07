import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthController } from './controller';

export class AuthRoutes {
	static get routes() {
		const router = Router();

		const authService = new AuthService();
		const authController = new AuthController(authService);

		router.post('/login', authController.loginUser);
		router.post('/register', authController.registerUser);

		return router;
	}
}
