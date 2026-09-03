"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { Search, X } from "lucide-react"

import ResultsGrid from "./ResultsGrid"
import SearchResultsSkeleton from "./SearchResultsSkeleton"
import InitialState from "./InitialState"
import EmptyState from "./EmptyState"
import ErrorState from "./ErrorState"
import { Input } from "@/shared/components/Input"
import type { TMDBMediaType } from "@/shared/interface/tmdb"
import type { SearchResult } from "@/shared/service/tmdb/search"

const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) throw new Error("Failed to fetch")
	return res.json()
}

interface SearchResponse {
	results: SearchResult[]
}

export default function SearchContent() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const query = searchParams.get("q") || ""

	const [inputValue, setInputValue] = React.useState(query)

	const { data, error, isLoading } = useSWR<SearchResponse, Error>(
		query ? `/api/search?q=${encodeURIComponent(query)}` : null,
		fetcher,
		{
			revalidateOnFocus: false,
		},
	)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const trimmed = inputValue.trim()
		if (trimmed) {
			router.push(`/search?q=${encodeURIComponent(trimmed)}`)
		}
	}

	const handleCardClick = (id: number, mediaType: TMDBMediaType) => {
		const route = mediaType === "tv" ? "/tv" : "/movies"
		router.push(`${route}/${id}`)
	}

	const handleClear = () => {
		setInputValue("")
		router.push("/search")
	}

	return (
		<main className="min-h-screen bg-bg-primary">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-text-primary mb-6">
						Search
					</h1>

					<form onSubmit={handleSubmit} className="relative max-w-xl">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
							<Input
								key={query}
								type="search"
								placeholder="Search movies and TV shows"
								defaultValue={query}
								onChange={(e) => setInputValue(e.target.value)}
								className="pl-10 h-12 text-base [-webkit-appearance:textfield] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
								aria-label="Search movies and TV shows"
							/>
							{inputValue && (
								<button
									type="button"
									onClick={handleClear}
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-colors"
									aria-label="Clear search"
								>
									<X className="w-5 h-5" />
								</button>
							)}
						</div>
					</form>
				</header>

				<section aria-label="Search results">
					{isLoading && <SearchResultsSkeleton />}

					{error && <ErrorState onRetry={() => router.refresh()} />}

					{!isLoading &&
						!error &&
						query &&
						data?.results.length === 0 && (
							<EmptyState query={query} />
						)}

					{!isLoading && !error && !query && <InitialState />}

					{!isLoading &&
						!error &&
						data?.results &&
						data.results.length > 0 && (
							<ResultsGrid
								results={data.results}
								query={query}
								onCardClick={handleCardClick}
							/>
						)}
				</section>
			</div>
		</main>
	)
}
