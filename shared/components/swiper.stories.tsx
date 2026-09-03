import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const meta: Meta<typeof Swiper> = {
	component: Swiper,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		direction: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Swipe direction",
		},
		slidesPerView: {
			control: { type: "number", min: 1, max: 10 },
			description: "Number of slides per view",
		},
		spaceBetween: {
			control: { type: "number", min: 0, max: 100 },
			description: "Space between slides in px",
		},
		speed: {
			control: { type: "number", min: 100, max: 2000 },
			description: "Transition speed in ms",
		},
		autoplay: {
			control: "boolean",
			description: "Enable autoplay",
		},
		loop: {
			control: "boolean",
			description: "Enable loop mode",
		},
		navigation: {
			control: "boolean",
			description: "Enable navigation arrows",
		},
		pagination: {
			control: "boolean",
			description: "Enable pagination dots",
		},
		centeredSlides: {
			control: "boolean",
			description: "Center the active slide",
		},
		grabCursor: {
			control: "boolean",
			description: "Enable grab cursor",
		},
	},
	args: {
		direction: "horizontal",
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 300,
		autoplay: false,
		loop: false,
		navigation: true,
		pagination: true,
		centeredSlides: false,
		grabCursor: true,
	},
}

export default meta
type Story = StoryObj<typeof Swiper>

const slideColors = [
	"bg-primary-base",
	"bg-success-base",
	"bg-warning-base",
	"bg-danger-base",
	"bg-info-base",
]

const SlideContent = ({ index }: { index: number }) => (
	<div
		className={`flex items-center justify-center h-64 text-white text-2xl font-bold ${slideColors[index % slideColors.length]}`}
	>
		Slide {index + 1}
	</div>
)

export const Default: Story = {
	render: (args) => {
		const modules = []
		if (args.navigation) modules.push(Navigation)
		if (args.pagination) modules.push(Pagination)
		if (args.autoplay) modules.push(Autoplay)
		modules.push(A11y)

		return (
			<div className="w-full max-w-4xl mx-auto">
				<Swiper
					modules={modules}
					direction={args.direction}
					slidesPerView={args.slidesPerView}
					spaceBetween={args.spaceBetween}
					speed={args.speed}
					autoplay={
						args.autoplay
							? { delay: 3000, disableOnInteraction: false }
							: undefined
					}
					loop={args.loop}
					navigation={args.navigation}
					pagination={args.pagination ? { clickable: true } : false}
					centeredSlides={args.centeredSlides}
					grabCursor={args.grabCursor}
					className="h-72"
				>
					{[...Array(5)].map((_, index) => (
						<SwiperSlide key={index}>
							<SlideContent index={index} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	},
}

export const MultipleSlides: Story = {
	args: {
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: true,
		pagination: true,
	},
	render: (args) => {
		const modules = []
		if (args.navigation) modules.push(Navigation)
		if (args.pagination) modules.push(Pagination)
		modules.push(A11y)

		return (
			<div className="w-full max-w-4xl mx-auto">
				<Swiper
					modules={modules}
					slidesPerView={args.slidesPerView}
					spaceBetween={args.spaceBetween}
					speed={args.speed}
					navigation={args.navigation}
					pagination={args.pagination ? { clickable: true } : false}
					grabCursor={args.grabCursor}
					className="h-72"
				>
					{[...Array(7)].map((_, index) => (
						<SwiperSlide key={index}>
							<SlideContent index={index} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	},
}

export const WithAutoplay: Story = {
	args: {
		autoplay: true,
		loop: true,
		pagination: true,
	},
	render: (args) => {
		const modules = [Pagination, Autoplay, A11y]

		return (
			<div className="w-full max-w-4xl mx-auto">
				<Swiper
					modules={modules}
					slidesPerView={args.slidesPerView}
					spaceBetween={args.spaceBetween}
					speed={args.speed}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					loop={args.loop}
					pagination={{ clickable: true }}
					grabCursor={args.grabCursor}
					className="h-72"
				>
					{[...Array(5)].map((_, index) => (
						<SwiperSlide key={index}>
							<SlideContent index={index} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	},
}

export const CenteredSlides: Story = {
	args: {
		slidesPerView: 3,
		spaceBetween: 30,
		centeredSlides: true,
		pagination: true,
	},
	render: (args) => {
		const modules = [Pagination, A11y]

		return (
			<div className="w-full max-w-4xl mx-auto">
				<Swiper
					modules={modules}
					slidesPerView={args.slidesPerView}
					spaceBetween={args.spaceBetween}
					speed={args.speed}
					centeredSlides={args.centeredSlides}
					pagination={{ clickable: true }}
					grabCursor={args.grabCursor}
					className="h-72"
				>
					{[...Array(5)].map((_, index) => (
						<SwiperSlide key={index}>
							<SlideContent index={index} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	},
}

export const Vertical: Story = {
	args: {
		direction: "vertical",
		slidesPerView: 3,
		spaceBetween: 20,
		pagination: true,
		grabCursor: false,
	},
	render: (args) => {
		const modules = [Pagination, A11y]

		return (
			<div className="w-full max-w-2xl mx-auto">
				<Swiper
					modules={modules}
					direction={args.direction}
					slidesPerView={args.slidesPerView}
					spaceBetween={args.spaceBetween}
					speed={args.speed}
					pagination={{ clickable: true }}
					grabCursor={args.grabCursor}
					className="h-96"
				>
					{[...Array(5)].map((_, index) => (
						<SwiperSlide key={index}>
							<SlideContent index={index} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	},
}
