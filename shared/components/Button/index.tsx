"use client"

import { Slot } from "radix-ui"
import { type VariantProps, cva } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"
import * as React from "react"

import { cn } from "@utils/cn"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium px-3 focus:outline-none leading-4 cursor-pointer",
	{
		variants: {
			size: {
				sm: "py-2 text-xs",
				m: "py-2",
				lg: "py-2.5",
				xl: "py-3",
			},
			btnType: {
				primary:
					"bg-primary-base hover:bg-primary-darker active:bg-primary-darkest focus:ring-1 focus:ring-offset-1 focus:ring-info-light focus:ring-offset-white",
				neutral:
					"bg-black focus:ring-1 focus:ring-offset-1 focus:ring-info-light focus:ring-offset-white",
				destructive:
					"bg-danger-dark hover:bg-danger-darker focus:ring-1 focus:ring-offset-1 focus:ring-info-light focus:ring-offset-white active:bg-danger-darkest",
			},
			variant: {
				solid:
					"text-white disabled:bg-secondary disabled:text-disable",
				outline:
					"border bg-white active:bg-white disabled:bg-secondary disabled:text-disable disabled:border disabled:border-stroke-primary",
				text: "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:text-disable focus:ring-0 focus:ring-offset-0",
			},
		},
		compoundVariants: [
			{
				variant: "solid",
				btnType: "primary",
				class: "text-white",
			},
			{
				variant: "outline",
				btnType: "primary",
				class:
					"bg-white border-primary-base text-primary-base focus:border focus:border-primary-base hover:bg-primary-lightest hover:border-primary-lightest active:border-primary-darker active:text-primary-darker",
			},
			{
				variant: "outline",
				btnType: "neutral",
				class:
					"bg-white border-stroke-primary text-primary hover:bg-primary hover:border-primary hover:text-icon-primary active:border-stroke-black",
			},
			{
				variant: "outline",
				btnType: "destructive",
				class:
					"bg-white border-danger-dark text-danger-dark hover:bg-danger-lightest hover:border-danger-lightest active:border-danger-darker active:text-danger-darker",
			},
			{
				variant: "text",
				btnType: "primary",
				class:
					"text-primary-base hover:text-primary-darker active:text-primary-darkest p-0",
			},
			{
				variant: "text",
				btnType: "neutral",
				class: "text-primary p-0",
			},
			{
				variant: "text",
				btnType: "destructive",
				class:
					"text-danger-dark hover:text-danger-darker active:text-danger-darkest p-0",
			},
		],
		defaultVariants: {
			variant: "solid",
			size: "m",
			btnType: "primary",
		},
	},
)

const iconVariant = cva("w-5 h-5", {
	variants: {
		size: {
			sm: "w-4 h-4",
			m: "",
			lg: "",
			xl: "",
		},
	},
	defaultVariants: {
		size: "m",
	},
})

export interface ButtonProps
	extends React.ComponentPropsWithoutRef<"button">,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			size,
			btnType,
			variant,
			asChild = false,
			leftIcon,
			rightIcon,
			loading = false,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot.Root : "button"
		const isDisabled = disabled || loading
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ size, btnType, variant, className }))}
				disabled={isDisabled}
				{...props}
			>
				{loading && (
					<Slot.Root className={cn(iconVariant({ size }), "animate-spin")}>
						<Loader2Icon />
					</Slot.Root>
				)}
				{!loading && leftIcon && (
					<Slot.Root className={cn(iconVariant({ size }))}>{leftIcon}</Slot.Root>
				)}
				<Slot.Slottable>{loading ? "Processing..." : children}</Slot.Slottable>
				{rightIcon && !loading && (
					<Slot.Root className={cn(iconVariant({ size }))}>{rightIcon}</Slot.Root>
				)}
			</Comp>
		)
	},
)

Button.displayName = "Button"

export { Button, buttonVariants }
