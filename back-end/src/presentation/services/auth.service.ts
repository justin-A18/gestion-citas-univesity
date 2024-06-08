import { LoginUserDto, RegisterUserDto } from '../../domain/dto/auth';
import { BycryptAdapter, JwtAdapter } from '../../config/adapters';
import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { UserModel } from '../../database/mongo';

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hashPassword: string) => boolean;

export class AuthService {
	constructor(
		private readonly hashPassword: HashPassword = BycryptAdapter.passwordHash,
		private readonly comparePassword: ComparePassword = BycryptAdapter.comparePassword
	) {}

	public async loginUser(loginUserDto: LoginUserDto) {
		try {
			const findUser = await UserModel.findOne({ email: loginUserDto.email });

			if (!findUser) {
				return CustomError.badRequest('Usuario no existe');
			}

			const isValidPassword = this.comparePassword(
				loginUserDto.password,
				findUser.password
			);

			if (!isValidPassword) {
				throw CustomError.badRequest('Creadenciales invalidas');
			}

			//* JWT para mantener la autenticación del usuario
			const token = await JwtAdapter.generateToken({
				id: findUser.id,
			});

			if (!token) throw CustomError.internalServer('Error while creating JWT');

			//* Convertimos el usuario a una entidad UserEntity
			const { password, ...userEntity } = UserEntity.fromObject(findUser);

			return {
				user: userEntity,
				token,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	public async registerUser(registerUserDto: RegisterUserDto) {
		try {
			const existUser = await UserModel.findOne({
				email: registerUserDto.email,
			});
			if (existUser) throw CustomError.badRequest('El email ya existe');

			const user = new UserModel(registerUserDto);

			user.password = this.hashPassword(registerUserDto.password);

			await user.save();

			const { password, ...userEntity } = UserEntity.fromObject(user);

			const token = await JwtAdapter.generateToken({ id: user.id });
			if (!token) throw CustomError.internalServer('Error while creating JWT');

			return {
				user: userEntity,
				token,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
}
