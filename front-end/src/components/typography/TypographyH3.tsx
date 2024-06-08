import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const TypographyH3 = ({ children, className }: Props) => {
	return (
		<h3 className={cn('tracking-tight text-2xl font-semibold', className)}>
			{children}
		</h3>
	);
};
