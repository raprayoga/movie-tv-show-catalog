"use client"

import * as React from "react"
import {
	Heart,
	Search,
	Menu,
	Film,
	TvIcon,
	Bookmark,
	LogOut,
	Home,
	X,
} from "lucide-react"

import { Avatar } from "@components/Avatar"
import { Button } from "@components/Button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/Dropdown"
import { useCurrentUser } from "@/shared/hooks/use-current-user"

interface NavLinkProps {
	href: string
	children: React.ReactNode
	isActive?: boolean
}

const NavLink = ({ href, children, isActive = false }: NavLinkProps) => {
	return (
		<a
			href={href}
			className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary-base ${isActive ? "text-primary-base" : "text-text-secondary"}`}
		>
			{children}
			{isActive && (
				<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-base" />
			)}
		</a>
	)
}

const NAV_LINKS = [
	{ href: "#", label: "Home", icon: <Home className="h-5 w-5" /> },
	{ href: "#", label: "Movies", icon: <Film className="h-5 w-5" /> },
	{ href: "#", label: "TV", icon: <TvIcon className="h-5 w-5" /> },
]

export function Navbar() {
	const { user, isAuthenticated, isLoading, login, logout } = useCurrentUser()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
	const mobileMenuRef = React.useRef<HTMLDivElement>(null)

	const handleMobileMenuToggle = () => {
		setIsMobileMenuOpen((prev) => !prev)
	}

	const handleMobileMenuClose = () => {
		setIsMobileMenuOpen(false)
	}

	React.useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isMobileMenuOpen) {
				handleMobileMenuClose()
			}
		}

		document.addEventListener("keydown", handleEscape)
		return () => document.removeEventListener("keydown", handleEscape)
	}, [isMobileMenuOpen])

	let accountActions: React.ReactNode
	if (isAuthenticated && user) {
		accountActions = (
			<div className="items-center gap-2 hidden md:flex">
				<Button type="button" aria-label="Favorites" variant="text" btnType="primary" size="sm" asChild>
					<Heart className="h-5 w-5" />
				</Button>
				<Button type="button" aria-label="Watchlist" variant="text" btnType="primary" size="sm" asChild>
					<Bookmark className="h-5 w-5" />
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-2"
							aria-label="User menu"
						>
							<Avatar fallback={user.username.slice(0, 2).toUpperCase()} size="sm" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem variant="destructive" className="text-danger-darker" onClick={logout}>
							<LogOut className="h-4 w-4" />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		)
	} else {
		accountActions = (
			<div className="hidden md:block">
				<Button variant="outline" btnType="primary" size="sm" onClick={login}>
					Login with TMDB
				</Button>
			</div>
		)
	}

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-stroke-primary bg-white" aria-label="Main navigation">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-8">
						<a href="#" className="flex items-center gap-2">
							<Film className="h-7 w-7 text-primary-base" />
							<span className="text-lg font-bold text-text-primary">MovieDB</span>
						</a>

						<div className="hidden md:flex md:items-center md:gap-1">
							{NAV_LINKS.map((link) => (
								<NavLink key={link.label} href={link.href}>
									{link.label}
								</NavLink>
							))}
						</div>
					</div>

					<div className="flex items-center gap-1 sm:gap-2">
						<Button variant="text" btnType="primary" size="sm" asChild>
							<a href="#" aria-label="Search">
								<Search className="h-5 w-5" />
							</a>
						</Button>

						{isLoading ? (
							<div className="hidden md:block">
								<Avatar fallback="?" size="sm" />
							</div>
						) : (
							accountActions
						)}

						<Button
							type="button"
							variant="text"
							className="md:hidden"
							onClick={handleMobileMenuToggle}
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-menu"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div
					ref={mobileMenuRef}
					id="mobile-menu"
					className="border-t border-stroke-primary bg-white md:hidden"
				>
					<div className="space-y-1 px-4 py-3">
						<a
							href="#"
							onClick={handleMobileMenuClose}
							className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-lightest hover:text-primary-base"
						>
							<Search className="h-5 w-5" />
							Search
						</a>

						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={handleMobileMenuClose}
								className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-lightest hover:text-primary-base"
							>
								{link.icon}
								{link.label}
							</a>
						))}

						{isAuthenticated && user ? (
							<>
								<a
									href="#"
									onClick={handleMobileMenuClose}
									className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-lightest hover:text-primary-base"
								>
									<Heart className="h-5 w-5" />
									Favorites
								</a>
								<a
									href="#"
									onClick={handleMobileMenuClose}
									className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-lightest hover:text-primary-base"
								>
									<Bookmark className="h-5 w-5" />
									Watchlist
								</a>
								<Button
									type="button"
									btnType="destructive"
									onClick={() => {
										logout()
										handleMobileMenuClose()
									}}
									className="w-full"
									leftIcon={<LogOut className="h-5 w-5" />}
								>
									Logout
								</Button>
							</>
						) : (
							<div className="pt-4">
								<Button variant="solid" btnType="primary" className="w-full" onClick={login}>
									Login with TMDB
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}
