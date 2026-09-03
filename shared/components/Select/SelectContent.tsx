import * as SelectPrimitive from "@radix-ui/react-select"
import * as React from "react"

import { cn } from "@utils/cn"

interface SelectContentProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
	ref?: React.Ref<HTMLDivElement>
}

const SelectContent = ({
	className,
	children,
	position = "popper",
	ref,
	...props
}: SelectContentProps) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				"relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-stroke-primary bg-white text-text-primary shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
				position === "popper" &&
				"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
				className,
			)}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport
				className={cn(
					"p-1",
					position === "popper" &&
					"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
)

export default SelectContent
