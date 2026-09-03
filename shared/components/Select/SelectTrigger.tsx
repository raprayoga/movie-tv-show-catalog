import * as SelectPrimitive from "@radix-ui/react-select"
import { VariantProps, cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@utils/cn"

export const selectTriggerVariant = cva(
	"flex h-10 w-full items-center justify-between rounded-lg border border-stroke-primary bg-white p-3 text-sm whitespace-nowrap placeholder:text-text-primary hover:border-primary-light focus:outline-none focus:border-primary-base focus:ring-1 focus:ring-info-light focus:ring-offset-1 focus:ring-offset-white data-[placeholder]:text-text-primary [&>span]:line-clamp-1 disabled:cursor-not-allowed disabled:bg-bg-primary disabled:text-text-disable",
	{
		variants: {
			size: {
				sm: "h-8 text-xs",
				m: "h-9",
				lg: "h-10",
				xl: "h-11",
			},
		},
		defaultVariants: {
			size: "xl",
		},
	},
)

interface SelectTriggerProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
	VariantProps<typeof selectTriggerVariant> {
	ref?: React.Ref<HTMLButtonElement>
}

const SelectTrigger = ({
	className,
	children,
	size,
	ref,
	...props
}: SelectTriggerProps) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(selectTriggerVariant({ size }), className)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDown className="h-5 w-5 text-text-primary group-has-[:disabled]:text-text-disable transition-transform duration-200 group-data-[state=open]:rotate-180" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
)

export default SelectTrigger
