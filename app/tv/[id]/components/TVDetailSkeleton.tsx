import { Skeleton } from "@/shared/components/Skeleton"

export default function TVDetailSkeleton() {
	return (
		<div className="min-h-screen bg-bg-primary">
			<div className="relative h-[60vh] min-h-[400px]">
				<Skeleton className="w-full h-full rounded-none" />
			</div>

			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="space-y-8">
					<div>
						<Skeleton className="h-4 w-24 mb-4 rounded" />
						<Skeleton className="h-10 w-96 mb-4 rounded" />
						<Skeleton className="h-4 w-full max-w-2xl mb-2 rounded" />
						<Skeleton className="h-4 w-3/4 max-w-2xl mb-6 rounded" />
						<Skeleton className="h-10 w-48 rounded" />
					</div>

					<div>
						<Skeleton className="h-6 w-32 mb-4 rounded" />
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="flex gap-4">
									<Skeleton className="w-40 h-24 flex-shrink-0 rounded-lg" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-5 w-48" />
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-3/4" />
									</div>
								</div>
							))}
						</div>
					</div>

					<div>
						<Skeleton className="h-6 w-32 mb-4 rounded" />
						<div className="flex gap-4">
							{[...Array(6)].map((_, i) => (
								<div key={i} className="w-28">
									<Skeleton className="aspect-[2/3] w-full rounded-lg" />
									<Skeleton className="h-4 w-full mt-2 rounded" />
									<Skeleton className="h-3 w-2/3 mt-1 rounded" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
