"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@utils/cn"
import * as React from "react"
import { X } from 'lucide-react'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-[51] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
		overlayClassName?: string
	}
>(({ className, children, overlayClassName, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay className={overlayClassName} />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(
				"fixed text-sm text-text-primary left-[50%] top-[50%] z-[51] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
				className,
			)}
			{...props}
		>
			{children}
		</DialogPrimitive.Content>
	</DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
	className,
	children,
	closeAction = true,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	closeAction?: boolean
}) => {
	const hasDescription = React.Children.toArray(children).some((child) => {
		return (
			React.isValidElement(child) &&
			// @ts-expect-error not an error
			child.type?.displayName === DialogPrimitive.Description.displayName
		)
	})
	return (
		<div
			className={cn(
				"flex flex-col space-y-1.5 sm:text-left py-4 px-5 border-b border-stroke-primary gap-1 text-text-primary ",
				className,
			)}
			{...props}
		>
			<span className="flex justify-start items-start gap-3">
				<div className="flex flex-col flex-1">{children}</div>

				{closeAction && (
					<DialogPrimitive.Close
						className={`text-icon-primary ${cn({ "self-center": !hasDescription })}`}
					>
						<X className="h-5 w-5" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</span>
		</div>
	)
}
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	const [Extra, ...RestChildren] = React.Children.toArray(children)
	const isExtra =
		React.isValidElement(Extra) &&
		// @ts-expect-error not an error
		Extra?.type?.displayName === "DialogFooterExtra"

	return (
		<div
			className={cn("flex py-3 px-5 border-t border-stroke-primary", className)}
			{...props}
		>
			{isExtra ? Extra : null}
			<span className="flex-1 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
				{isExtra ? RestChildren : children}
			</span>
		</div>
	)
}
DialogFooter.displayName = "DialogFooter"

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
}
