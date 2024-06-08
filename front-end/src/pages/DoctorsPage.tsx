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
import { useDoctors } from '@/hooks';

export const DoctorsPage = () => {
	const { doctorQuery } = useDoctors();

	return (
		<div className='bg-white w-full h-full rounded-md p-4'>
			<TypographyH2 className='text-[#252136] text-xl'>Doctores</TypographyH2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre Completo</TableHead>
						<TableHead >Descripción</TableHead>
						<TableHead className='text-right'>Acciones</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{doctorQuery.isLoading && (
						<TableRow>
							<TableCell className='text-center'>
								<i className='bx bx-loader-alt bx-spin bx-lg'></i>
							</TableCell>
						</TableRow>
					)}

					{!doctorQuery.isLoading &&
						(doctorQuery.data as unknown as DoctorsResponse).doctors.map(
							({ description, fullname, id }) => (
								<TableRow key={id}>
									<TableCell>{fullname}</TableCell>
									<TableCell>{description}</TableCell>

									<TableCell className='text-right'>
										<Button
											variant='ghost'
											className='text-blue-400 hover:text-blue-600'>
											<i className='bx bxs-edit-alt bx-sm'></i>
										</Button>
										<Button
											variant='ghost'
											className='text-red-400 hover:text-red-500'>
											<i className='bx bxs-trash-alt bx-sm'></i>
										</Button>
									</TableCell>
								</TableRow>
							)
						)}
				</TableBody>
			</Table>
		</div>
	);
};
