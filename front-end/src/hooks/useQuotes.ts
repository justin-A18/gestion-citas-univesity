import { getQuotesService } from '@/services/quotes.service';
import { authStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

export const useQuotes = () => {
	const { token } = authStore((state) => state.initialState);

	const quotesQuery = useQuery({
		queryKey: ['quotes'],
		queryFn: () => getQuotesService(token!),
	});

	return {
		quotesQuery,
	};
};
