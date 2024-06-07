import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	JWT_SEED: get('JTW_SEED').required().asString(),
	MONGO_URL: get('MONGO_URL').required().asString(),
	MONGO_NAME: get('MONGO_NAME').required().asString(),
};
