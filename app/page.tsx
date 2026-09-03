import { Navbar } from "@components/Navbar"

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="flex flex-1 items-center justify-center p-8">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-text-primary mb-2">
						Welcome to MovieDB
					</h1>
					<p className="text-text-secondary">
						Your favorite movies and TV shows in one place.
					</p>
				</div>
			</main>
		</>
	)
}
