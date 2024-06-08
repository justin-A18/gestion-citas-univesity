import { helpHttp } from '@/helpers';
import { AxiosError, AxiosResponse } from 'axios';

export const getQuotesService = async (token: string) => {
	const res = await helpHttp({
		url: '/quotes',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if ((res as AxiosError).isAxiosError) {
		return res as AxiosError;
	}

	return (res as AxiosResponse).data as QuotesResponse;
};

export const createQuoteService = async (token: string, quote: QuoteModel) => {
	const res = await helpHttp({
		url: '/quotes/new',
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: quote,
	});

	if ((res as AxiosError).isAxiosError) {
		return res as AxiosError;
	}

	return (res as AxiosResponse).data as QuoteResponse;
};

export const updateQuoteService = async ({
	token,
	quote,
	id,
}: {
	token: string;
	quote: Quote;
	id: string;
}) => {
	const res = await helpHttp({
		url: `/quotes/${id}`,
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: quote,
	});

	if ((res as AxiosError).isAxiosError) {
		return res as AxiosError;
	}

	return (res as AxiosResponse).data as QuoteResponse;
};

export const deleteQuoteService = async (token: string, id: string) => {
	const res = await helpHttp({
		url: `/quotes/${id}`,
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if ((res as AxiosError).isAxiosError) {
		return res as AxiosError;
	}

	return (res as AxiosResponse).data as QuoteResponse;
};
