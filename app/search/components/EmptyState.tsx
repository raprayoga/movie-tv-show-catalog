interface EmptyStateProps {
	query: string
}

export default function EmptyState({ query }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
			<h2 className="text-xl font-semibold text-text-primary mb-2">No results found</h2>
			<p className="text-text-secondary">
				We couldn&apos;t find any movies or TV shows matching &quot;{query}&quot;.
			</p>
		</div>
	)
}
