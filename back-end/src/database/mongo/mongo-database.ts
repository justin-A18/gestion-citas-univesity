import { connect, disconnect } from 'mongoose';

interface Options {
	mongoUrl: string;
	dbName: string;
}

export class MongoDatabase {
	static async connect(options: Options) {
		try {
			const { mongoUrl, dbName } = options;
			await connect(mongoUrl, { dbName });

			console.log('Mongo connection established 💯');

		} catch (error) {
			console.log('Mongo connection error');
			throw error;
		}
	}

	static async disconnect() {
		await disconnect();
	}
}
