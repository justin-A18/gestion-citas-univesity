import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const TypographyH2 = ({ children, className }: Props) => {
	return (
		<h2 className={cn('tracking-tight font-semibold text-3xl', className)}>
			{children}
		</h2>
	);
};
