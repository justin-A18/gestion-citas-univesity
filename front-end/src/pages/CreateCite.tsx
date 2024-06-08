import { z } from 'zod';

import { useForm } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { TypographyH2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { quoteSchema } from '@/schemas/quoteSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { useDoctors, useMutationQuotes } from '@/hooks';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export const CreateCite = () => {
	const { doctorQuery } = useDoctors();
	const { createQuoteMutation } = useMutationQuotes();

	const form = useForm<z.infer<typeof quoteSchema>>({
		resolver: zodResolver(quoteSchema),
	});

	const onSubmit = (data: z.infer<typeof quoteSchema>) => {
		createQuoteMutation.mutateAsync(data);
	};

	return (
		<div className='bg-white w-full h-full rounded-md p-4'>
			<TypographyH2 className='text-[#252136] text-xl mb-4'>
				Create
			</TypographyH2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full flex flex-col space-y-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field, formState: { errors } }) => (
							<FormItem>
								<FormLabel className='text-[#252136]'>Nombre</FormLabel>
								<FormControl>
									<Input
										className={`${
											errors.name ? 'border-red-500' : 'border-[#252136]'
										}`}
										placeholder='jhoe doe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='lastname'
						render={({ field, formState: { errors } }) => (
							<FormItem>
								<FormLabel className='text-[#252136]'>Apellido</FormLabel>
								<FormControl>
									<Input
										className={`${
											errors.lastname ? 'border-red-500' : 'border-[#252136]'
										}`}
										placeholder='torres quispe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='doctor'
						render={({ field, formState: { errors } }) => (
							<FormItem>
								<FormLabel className='text-[#252136]'>Doctor</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl
										className={`${
											errors.doctor ? 'border-red-500' : 'border-[#252136]'
										}`}>
										<SelectTrigger>
											<SelectValue placeholder='Seleccione un doctor' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{!doctorQuery.isLoading &&
											(
												doctorQuery?.data as unknown as DoctorsResponse
											).doctors?.map(({ fullname, id }) => (
												<SelectItem
													value={id ? id : ''}
													key={id}>
													{fullname}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='reason'
						render={({ field, formState: { errors } }) => (
							<FormItem>
								<FormLabel className='text-[#252136]'>Motivo</FormLabel>
								<FormControl>
									<Textarea
										className={`${
											errors.reason ? 'border-red-500' : 'border-[#252136]'
										} resize-none`}
										placeholder='Describe el motivo de la consulta...'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='createAt'
						render={({ field, formState: { errors } }) => (
							<FormItem className='flex flex-col'>
								<FormLabel className='text-[#252136]'>
									Fecha de Citacion
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													`pl-3 text-left font-normal ${
														errors.createAt
															? 'border-red-500'
															: 'border-[#252136]'
													}`,
													!field.value && 'text-muted-foreground'
												)}>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='end'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < new Date()}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='endAt'
						render={({ field, formState: { errors } }) => (
							<FormItem className='flex flex-col'>
								<FormLabel className='text-[#252136]'>
									Fecha de Caducidad
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													`pl-3 text-left font-normal ${
														errors.endAt ? 'border-red-500' : 'border-[#252136]'
													}`,
													!field.value && 'text-muted-foreground'
												)}>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='end'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date <= form.getValues('createAt')}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='bg-[#36AE6E] hover:bg-[#36AE6E]/70 text-lg p-6'>
						Crear cita
					</Button>
				</form>
			</Form>
		</div>
	);
};
