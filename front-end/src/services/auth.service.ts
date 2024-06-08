import { helpHttp } from '@/helpers';
import { AxiosError, AxiosResponse } from 'axios';

export const signInService = async (user: UserCredentials) => {
	const res = await helpHttp({
		url: '/auth/login',
		method: 'POST',
		data: user,
	});

	if ((res as AxiosError).isAxiosError) {
		return res as AxiosError;
	}

	return (res as AxiosResponse).data as LoginResponse;
};
