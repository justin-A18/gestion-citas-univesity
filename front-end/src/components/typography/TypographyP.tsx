import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const TypographyP = ({ children, className }: Props) => {
	return <p className={cn('leading-7 text-lg', className)}>{children}</p>;
};
