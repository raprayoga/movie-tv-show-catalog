"use client"

import * as React from "react"

import { cn } from "@utils/cn"

type CardsProps = React.HTMLAttributes<HTMLDivElement>

const Card = React.forwardRef<HTMLDivElement, CardsProps>(
	({ className, ...props }, ref) => (
		<div
			data-slot="card"
			ref={ref}
			className={cn(
				"group/card rounded-xl border border-stroke-secondary bg-white",
				className,
			)}
			{...props}
		/>
	),
)
Card.displayName = "Card"

const CardHeader = ({ className, ...props }: CardsProps) => (
	<div
		data-slot="card-header"
		className={cn("group/card-header border-b border-stroke-secondary p-4 w-full", className)}
		{...props}
	/>
)

const CardContent = ({ className, ...props }: CardsProps) => (
	<div
		data-slot="card-content"
		className={cn("rounded-xl p-4 w-full", className)}
		{...props}
	/>
)

const CardFooter = ({ className, ...props }: CardsProps) => (
	<div
		data-slot="card-footer"
		className={cn("border-t border-stroke-secondary p-4 w-full", className)}
		{...props}
	/>
)

export { Card, CardHeader, CardFooter, CardContent }
