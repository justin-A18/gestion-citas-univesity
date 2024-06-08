import { AxiosError } from 'axios';

import { useMutationAuth } from './useAuthMutation';
import { authStore } from '@/store/authStore';

export const useAuthActions = () => {
	const { signInMutation } = useMutationAuth();
	const { onLogin, checkingCredentials, onLogout } = authStore();

	const startSignIn = async (data: UserCredentials) => {
		try {
			checkingCredentials();

			const res = await signInMutation.mutateAsync(data);

			if ((res as AxiosError).response?.data) {
				throw new Error(
					((res as AxiosError)?.response?.data as ErrorAuth).error
				);
			}

			const { token, user } = res as LoginResponse;

			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('token-init-date', new Date().toString());
			localStorage.setItem('status', 'authenticated');

			onLogin(res as LoginResponse);
		} catch (error) {
			const errMsg = error as AxiosError;
			console.log(errMsg.message);
			onLogout(errMsg.message);
		}
	};

	return {
		startSignIn,
	};
};
