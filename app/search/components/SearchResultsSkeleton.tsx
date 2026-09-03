import Skeleton from "@/shared/components/Skeleton"

export default function SearchResultsSkeleton() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
			{[...Array(12)].map((_, i) => (
				<div key={i}>
					<Skeleton className="aspect-[2/3] w-full rounded-lg" />
					<div className="pt-2 space-y-1">
						<Skeleton className="h-4 w-full rounded" />
						<Skeleton className="h-3 w-2/3 rounded" />
					</div>
				</div>
			))}
		</div>
	)
}
