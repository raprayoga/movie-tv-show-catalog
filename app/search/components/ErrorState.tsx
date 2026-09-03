import { Button } from "@/shared/components/Button"

interface ErrorStateProps {
	onRetry: () => void
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
			<h2 className="text-xl font-semibold text-text-primary mb-2">Something went wrong</h2>
			<p className="text-text-secondary mb-6">We couldn&apos;t load the search results. Please try again.</p>
			<Button variant="outline" btnType="primary" onClick={onRetry}>
				Try Again
			</Button>
		</div>
	)
}
