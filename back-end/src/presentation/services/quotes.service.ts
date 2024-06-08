import { CreateQuoteDto, UpdateQuoteDto } from '../../domain/dto/quotes';
import { QuoteEntity } from '../../domain/entities';
import { QuoteModel } from '../../database/mongo';
import { CustomError } from '../../domain/errors';
import { Validations } from '../../config';

export class QuotesService {
	public async getAllQuotes() {
		try {
			const quotes = await QuoteModel.find({ active: true }).populate(
				'doctor',
				'fullname'
			);

			return {
				quotes,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	public async createQuote(createQuote: CreateQuoteDto) {
		try {
			const startOfDay = Validations.startDay(createQuote.createAt);
			const endOfDay = Validations.endDay(createQuote.createAt);

			const findQuote = await QuoteModel.findOne({
				createAt: { $gte: startOfDay, $lte: endOfDay },
			});

			if (findQuote)
				throw CustomError.badRequest('Ya hay una cita para ese dia');

			const newQuote = await QuoteModel.create(createQuote);

			await newQuote.save();

			const quoteEntity = QuoteEntity.fromObject(newQuote);

			return {
				quote: quoteEntity,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	public async updateQuote(id: string, updateQuote: UpdateQuoteDto) {
		try {
			const startOfDay = Validations.startDay(updateQuote.createAt);
			const endOfDay = Validations.endDay(updateQuote.createAt);

			const findQuote = await QuoteModel.findOne({
				createAt: { $gte: startOfDay, $lte: endOfDay },
			});

			if (findQuote)
				throw CustomError.badRequest('Ya hay una cita para ese dia');

			const quote = await QuoteModel.findByIdAndUpdate(id, updateQuote, {
				new: true,
			});

			return {
				quote,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}

	public async deleteQuote(id: string) {
		try {
			const findQuote = await QuoteModel.findById(id);
			if (!findQuote) throw CustomError.notFound('Cita no existe con ese Id');

			const deletedQuote = await QuoteModel.findByIdAndDelete(id);

			return {
				quote: deletedQuote,
			};
		} catch (error) {
			throw CustomError.internalServer(`${error}`);
		}
	}
}
