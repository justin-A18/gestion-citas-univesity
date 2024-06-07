import { Request, Response } from 'express';

import { CreateQuoteDto, UpdateQuoteDto } from '../../domain/dto/quotes';
import { QuotesService } from '../services/quotes.service';
import { CustomError } from '../../domain/errors';

export class QuotesController {
	constructor(private readonly quotesService: QuotesService) {}

	private handleError(error: unknown, res: Response) {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: error.message });
		}
		console.log(`${error}`);
		return res.status(500).json({ error: 'Internal server error' });
	}

	getQuotes = (req: Request, res: Response) => {
		this.quotesService
			.getAllQuotes()
			.then((quotes) => res.json(quotes))
			.catch((err) => this.handleError(err, res));
	};

	createQuote = (req: Request, res: Response) => {
		const [error, createQuoteDto] = CreateQuoteDto.create(req.body);

		if (error) return res.status(400).json({ error });

		this.quotesService
			.createQuote(createQuoteDto!)
			.then((quote) => res.json(quote))
			.catch((err) => this.handleError(err, res));
	};

	updateQuote = (req: Request, res: Response) => {
		const [error, updateQuoteDto] = UpdateQuoteDto.create(req.body);

		const { id } = req.params;

		if (error) return res.status(400).json({ error });

		this.quotesService
			.updateQuote(id, updateQuoteDto!)
			.then((quote) => res.json(quote))
			.catch((err) => this.handleError(err, res));
	};

	deleteQuote = (req: Request, res: Response) => {
		const { id } = req.params;

		this.quotesService
			.deleteQuote(id)
			.then((quote) => res.json(quote))
			.catch((err) => this.handleError(err, res));
	};
}
