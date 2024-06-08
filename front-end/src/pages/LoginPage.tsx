import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginSchema } from '@/schemas';
import { useAuthActions } from '@/hooks';
import { authStore } from '@/store/authStore';
import { Toaster } from '@/components/ui/toaster';

export const LoginPage = () => {
	const { startSignIn } = useAuthActions();
	const { messageError } = authStore((state) => state.initialState);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: z.infer<typeof loginSchema>) => {
		startSignIn(data);

		toast({
			description: messageError,
			variant: 'destructive',
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full flex flex-col space-y-6'>
				<FormField
					control={form.control}
					name='email'
					render={({ field, formState: { errors } }) => (
						<FormItem>
							<FormLabel className='text-[#252136]'>Email</FormLabel>
							<FormControl>
								<Input
									className={`${
										errors.email ? 'border-red-500' : 'border-[#252136]'
									}`}
									placeholder='example@gmail.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field, formState: { errors } }) => (
						<FormItem>
							<FormLabel className='text-[#252136]'>Password</FormLabel>
							<FormControl>
								<Input
									className={`${
										errors.password ? 'border-red-500' : 'border-[#252136]'
									}`}
									placeholder='********'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{messageError && <Toaster />}

				<Button
					type='submit'
					className='bg-[#36AE6E] hover:bg-[#36AE6E]/70'>
					Login
				</Button>
			</form>
		</Form>
	);
};
