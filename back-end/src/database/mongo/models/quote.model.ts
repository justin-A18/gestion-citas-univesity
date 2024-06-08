import { Schema, model } from 'mongoose';
import { QuoteEntity } from '../../../domain/entities';

const QuoteSchema = new Schema<QuoteEntity>({
	name: { type: String, required: [true, 'name is required'] },
	lastname: { type: String, required: [true, 'lastname is required'] },
	doctor: {
		type: Schema.Types.ObjectId,
		ref: 'Doctors',
		required: [true, 'doctor is required'],
	},
	reason: { type: String, required: [true, 'reason is required'] },
	active: {
		type: Boolean,
		default: true,
	},
	createAt: {
		type: Date,
		required: [true, 'createAt is required'],
		default: new Date(),
	},
	endAt: { type: Date, required: [true, 'endAt is required'] },
});

QuoteSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (_, ret) {
		delete ret._id;
	},
});

export const QuoteModel = model('Quotes', QuoteSchema);
