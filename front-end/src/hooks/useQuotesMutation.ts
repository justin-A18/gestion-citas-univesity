import {
	createQuoteService,
	updateQuoteService,
	deleteQuoteService,
} from '@/services/quotes.service';
import { authStore } from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutationQuotes = () => {
	const { token } = authStore((state) => state.initialState);

	const queryClient = useQueryClient();

	const createQuoteMutation = useMutation({
		mutationKey: ['quotes', { token }],
		mutationFn: (data: QuoteModel) => {
			return createQuoteService(token!, data);
		},
	});

	const updateQuoteMutation = useMutation({
		mutationKey: ['quotes', { token }],
		mutationFn: ({ data, id }: { data: Quote; id: string }) => {
			return updateQuoteService({ token: token!, quote: data, id });
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['quotes'],
			});
		},
	});

	const deleteQuoteMutation = useMutation({
		mutationKey: ['quotes', { token }],
		mutationFn: (id: string) => {
			return deleteQuoteService(token!, id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['quotes'],
			});
		},
	});

	return {
		createQuoteMutation,
		updateQuoteMutation,
		deleteQuoteMutation,
	};
};
