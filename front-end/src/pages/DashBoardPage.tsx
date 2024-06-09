import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { TypographyH2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { useMutationQuotes, useQuotes } from '@/hooks';

export const DashBoardPage = () => {
	const { quotesQuery } = useQuotes();
	const { deleteQuoteMutation } = useMutationQuotes();

	const handleDeleteQuote = (id: string) => {
		deleteQuoteMutation.mutate(id);
	};

	return (
		<div className='bg-white w-full h-full rounded-md p-4'>
			<TypographyH2 className='text-[#252136] text-xl'>Citas</TypographyH2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Apellido</TableHead>
						<TableHead className='text-center'>Motivo</TableHead>
						<TableHead className='text-right'>Doctor</TableHead>
						<TableHead className='text-right'>Fecha</TableHead>
						<TableHead className='text-right'>Caducidad</TableHead>
						<TableHead className='text-right'>Acciones</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{quotesQuery.isLoading && (
						<TableRow>
							<TableCell
								colSpan={7}
								className='text-center'>
								<i className='bx bx-loader-alt bx-spin bx-lg'></i>
							</TableCell>
						</TableRow>
					)}

					{!quotesQuery.isLoading && quotesQuery.isError && (
						<TableRow>
							<TableCell
								colSpan={7}
								className='text-center'>
								<p>Error loading quotes</p>
							</TableCell>
						</TableRow>
					)}

					{!quotesQuery.isLoading &&
					!quotesQuery.isError &&
					quotesQuery.data &&
					(quotesQuery.data as unknown as QuotesResponse).quotes &&
					(quotesQuery.data as unknown as QuotesResponse).quotes.length > 0 ? (
						(quotesQuery.data as unknown as QuotesResponse).quotes.map(
							({ createAt, endAt, doctor, lastname, name, reason, id }) => (
								<TableRow key={id}>
									<TableCell>{name}</TableCell>
									<TableCell>{lastname}</TableCell>
									<TableCell>{reason}</TableCell>
									<TableCell className='text-right'>
										{doctor.fullname}
									</TableCell>
									<TableCell className='text-right'>
										{new Date(createAt).toLocaleDateString()}
									</TableCell>
									<TableCell className='text-right'>
										{new Date(endAt).toLocaleDateString()}
									</TableCell>
									<TableCell className='text-right'>
										<Button
											variant='ghost'
											className='text-blue-400 hover:text-blue-600'>
											<i className='bx bxs-edit-alt bx-sm'></i>
										</Button>
										<Button
											onClick={() => handleDeleteQuote(id)}
											variant='ghost'
											className='text-red-400 hover:text-red-500'>
											<i className='bx bxs-trash-alt bx-sm'></i>
										</Button>
									</TableCell>
								</TableRow>
							)
						)
					) : (
						<TableRow>
							<TableCell
								colSpan={7}
								className='text-center'>
								No hay citas disponibles
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
