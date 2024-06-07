import { Schema, model } from 'mongoose';
import { UserEntity } from '../../../domain/entities';

const userSchema = new Schema<UserEntity>({
	username: { type: String, required: [true, 'username is required'] },
	email: { type: String, required: [true, 'email is required'], unique: true },
	password: { type: String, required: [true, 'password is required'] },
	role: {
		type: String,
		required: [true, 'role is required'],
		enum: ['ADMIN_ROLE', 'USER_ROLE'],
		default: 'USER_ROLE',
	},
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		delete ret._id;
		delete ret.password;
	},
});

export const UserModel = model('Users', userSchema);
