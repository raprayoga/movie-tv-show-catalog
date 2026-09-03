import { Suspense } from "react"
import SearchContent from "./components/SearchContent"

function SearchPageSkeleton() {
	return (
		<main className="min-h-screen bg-bg-primary">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-text-primary mb-6">Search</h1>
					<div className="h-12 w-full max-w-xl bg-bg-secondary animate-pulse rounded-md" />
				</div>
			</div>
		</main>
	)
}

export default function SearchPage() {
	return (
		<Suspense fallback={<SearchPageSkeleton />}>
			<SearchContent />
		</Suspense>
	)
}
