import * as SelectPrimitive from "@radix-ui/react-select"
import * as React from "react"

import { cn } from "@utils/cn"

interface SelectItemProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
	ref?: React.Ref<HTMLDivElement>
	IconLeft?: React.ReactNode
	IconRight?: React.ReactNode
	itemText?: string | React.ReactNode
}

const SelectItem = ({
	className,
	children,
	IconLeft,
	IconRight,
	itemText,
	ref,
	...props
}: SelectItemProps) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-2.5 pr-2 text-sm outline-none",
			"hover:bg-info-lightest",
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			"data-[state=checked]:bg-info-lightest data-[state=checked]:text-primary-base",
			"mb-1 last:mb-0",
			className,
		)}
		{...props}
	>
		{IconLeft && (
			<span className="flex items-center justify-center mr-2">{IconLeft}</span>
		)}

		{itemText && (
			<>
				<p className="hidden">
					<SelectPrimitive.ItemText>{itemText}</SelectPrimitive.ItemText>
				</p>
				{children}
			</>
		)}
		{!itemText && (
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		)}

		{IconRight && (
			<span className="block items-center justify-center ml-auto">
				{IconRight}
			</span>
		)}
	</SelectPrimitive.Item>
)

export default SelectItem
