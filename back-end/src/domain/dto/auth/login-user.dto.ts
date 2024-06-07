import { Validations } from "../../../config";

export class LoginUserDto {
	constructor(public email: string, public password: string) {}

	static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
		const { email, password } = object;

		if (!email) return ['email is required'];
		if (!password) return ['password is required'];
		if (!Validations.email.test(email)) return ['email is not valid'];
		if (password.length < 6) return ['Password must be at least 6 characters'];

		return [undefined, new LoginUserDto(email, password)];
	}
}
