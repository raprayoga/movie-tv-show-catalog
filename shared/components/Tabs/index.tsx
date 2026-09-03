"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { Slot } from "@radix-ui/react-slot"
import { cn } from "@utils/cn"

interface TabsProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
	ref?: React.Ref<HTMLDivElement>
}

const Tabs = ({ ref, ...props }: TabsProps) => (
	<TabsPrimitive.Root ref={ref} {...props} />
)

const tabsListVariants = cva(
	"inline-flex items-center justify-center gap-0.5 rounded-xl bg-muted px-1 text-muted-foreground",
	{
		variants: {
			variant: {
				underline:
					" w-full flex justify-start rounded-none border-b border-stroke-primary",
				pill: "",
				card: "bg-bg-primary border border-stroke-primary",
			},
			size: {
				sm: "h-8",
				lg: "h-10",
			},
		},
		compoundVariants: [
			{
				variant: "card",
				size: "lg",
				class: "h-12",
			},
			{
				variant: "card",
				size: "sm",
				class: "h-10",
			},
		],
		defaultVariants: {
			variant: "underline",
			size: "lg",
		},
	},
)

const tabsTriggerVariants = cva(
	"rounded-lg text-sm text-text-secondary leading-5 bg-transparent focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-info-base focus:ring-offset-white data-[state=active]:font-semibold",
	{
		variants: {
			variant: {
				underline:
					"data-[state=active]:border-b data-[state=active]:border-primary-base data-[state=active]:text-primary-base rounded-none hover:text-primary-base",
				pill: "hover:bg-bg-primary hover:text-text-primary active:bg-info-lighter active:text-primary-base data-[state=active]:bg-info-lighter data-[state=active]:text-primary-base",
				card: "hover:bg-bg-secondary hover:text-text-primary active:bg-bg-white active:text-text-primary active:shadow-soft-xs data-[state=active]:bg-bg-white data-[state=active]:text-text-primary data-[state=active]:shadow-soft-xs",
			},
			size: {
				sm: "px-5 py-1.5",
				lg: "px-5 py-2.5",
			},
		},
		defaultVariants: {
			variant: "underline",
			size: "lg",
		},
	},
)

interface TabsListProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
	VariantProps<typeof tabsListVariants> {
	ref?: React.Ref<HTMLDivElement>
}

const TabsList = ({
	variant,
	size,
	className,
	children,
	ref,
	...props
}: TabsListProps) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(tabsListVariants({ variant, size, className }))}
		{...props}
	>
		{typeof children === "object" &&
			children !== null &&
			Symbol.iterator in children
			? React.Children.toArray(children)?.map((child) => (
				<Slot
					key={(child as React.ReactElement).key}
					className={cn(tabsTriggerVariants({ variant, size }))}
				>
					{child}
				</Slot>
			))
			: children}
	</TabsPrimitive.List>
)
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
	ref?: React.Ref<HTMLButtonElement>
}

const TabsTrigger = ({ className, ref, ...props }: TabsTriggerProps) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:bg-transparent disabled:text-text-disable font-normal",
			className,
		)}
		{...props}
	/>
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

interface TabsContentProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
	ref?: React.Ref<HTMLDivElement>
}

const TabsContent = ({ className, ref, ...props }: TabsContentProps) => (
	<TabsPrimitive.Content ref={ref} className={cn("", className)} {...props} />
)
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
