import axios, { AxiosError, AxiosResponse } from 'axios';

interface RequestOptions {
	url: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	data?: unknown;
	params?: unknown;
	headers?: Record<string, string>;
}

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:3000/api',
});

export const helpHttp = async ({
	url,
	method = 'GET',
	data = {},
	params = {},
	headers = {},
}: RequestOptions): Promise<AxiosResponse | AxiosError> => {
	const headersResponse = {
		'Content-Type': 'application/json',
		...headers,
	};

	try {
		const response = await instance({
			url,
			method,
			params,
			data,
			headers: headersResponse,
		});

		return response;
	} catch (error) {
		const axiosError = error as AxiosError;
		return axiosError;
	}
};