import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const TypographyH1 = ({ children, className }: Props) => {
	return (
		<h1 className={cn('tracking-tight text-4xl font-extrabold', className)}>
			{children}
		</h1>
	);
};
