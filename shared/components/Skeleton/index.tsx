import { cn } from "@utils/cn"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.Ref<HTMLDivElement>
}

export default function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-bg-secondary animate-pulse rounded-md", className)}
			{...props}
		/>
	)
}

export { Skeleton }
