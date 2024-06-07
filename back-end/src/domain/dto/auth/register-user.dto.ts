import { Validations } from "../../../config";

export class RegisterUserDto {
	constructor(
		public username: string,
		public email: string,
		public password: string
	) {}

	static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
		const { email, username, password } = object;

		if (!email) return ['Missing email'];
		if (!username) return ['Missing username'];
		if (!password) return ['Missing password'];
		if (!Validations.email.test(email)) return ['Email is not valid'];
		if (password.length < 6) return ['Password must be at least 6 characters'];

		return [undefined, new RegisterUserDto(username, email, password)];
	}
}
