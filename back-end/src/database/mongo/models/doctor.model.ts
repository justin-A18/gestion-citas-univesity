import { Schema, model } from 'mongoose';

const doctorSchema = new Schema({
	fullname: { type: String, required: [true, 'fullname is required'] },
	description: {
		type: String,
		required: [true, 'description is required'],
	},
});

doctorSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		delete ret._id;
	},
});

export const DoctorModel = model('Doctors', doctorSchema);
