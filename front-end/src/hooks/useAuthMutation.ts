import { signInService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

export const useMutationAuth = () => {
	const signInMutation = useMutation({
		mutationFn: (data: UserCredentials) => {
			return signInService(data);
		},
	});

	return {
		signInMutation,
	};
};
