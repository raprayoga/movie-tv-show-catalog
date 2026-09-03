"use client"

import * as React from "react"

import { cn } from "@utils/cn"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	src?: string
	alt?: string
	fallback?: string
	size?: "sm" | "md" | "lg"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	({ className, src, alt, fallback, size = "md", ...props }, ref) => {
		const [imageError, setImageError] = React.useState(false)

		const sizeClasses = {
			sm: "h-8 w-8 text-xs",
			md: "h-10 w-10 text-sm",
			lg: "h-12 w-12 text-base",
		}

		const initials = fallback
			? fallback.slice(0, 2).toUpperCase()
			: alt
				? alt.slice(0, 2).toUpperCase()
				: "?"

		return (
			<div
				ref={ref}
				className={cn(
					"relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-base text-white font-medium",
					sizeClasses[size],
					className
				)}
				{...props}
			>
				{src && !imageError ? (
					<img
						src={src}
						alt={alt || "Avatar"}
						className="aspect-square h-full w-full object-cover"
						onError={() => setImageError(true)}
					/>
				) : (
					<span>{initials}</span>
				)}
			</div>
		)
	}
)

Avatar.displayName = "Avatar"

export { Avatar }
