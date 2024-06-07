import { Request, Response } from 'express';

import { LoginUserDto, RegisterUserDto } from '../../domain/dto/auth';
import { AuthService } from '../services/auth.service';
import { CustomError } from '../../domain/errors';

export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private handleError(error: unknown, res: Response) {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}
		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	}

	loginUser = (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDto.create(req.body);
		if (error) return res.status(400).json({ error });

		this.authService
			.loginUser(loginUserDto!)
			.then((user) => res.json(user))
			.catch((err) => this.handleError(err, res));
	};

	registerUser = (req: Request, res: Response) => {
		const [error, registerUserDto] = RegisterUserDto.create(req.body);
		if (error) return res.status(400).json({ error });

		this.authService
			.registerUser(registerUserDto!)
			.then((user) => res.json(user))
			.catch((err) => this.handleError(err, res));
	};
}
