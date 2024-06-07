import { compareSync, hashSync } from 'bcryptjs';

export class BycryptAdapter {
	static passwordHash(password: string) {
		return hashSync(password);
	}

	static comparePassword(password: string, hashPassword: string) {
		return compareSync(password, hashPassword);
	}
}
