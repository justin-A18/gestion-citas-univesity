import express, { Router } from 'express';
import cors from 'cors';

interface Options {
	port: number;
	routes: Router;
}

export class Server {
	public readonly port: number;
	private readonly routes: Router;
	private readonly app = express();

	constructor(options: Options) {
		const { port, routes } = options;

		this.port = port;
		this.routes = routes;
	}

	async start() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(
			cors({
				origin: ['http://localhost:5173'],
				credentials: true,
			})
		);

		this.app.use(this.routes);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port} 🚀`);
		});
	}
}
