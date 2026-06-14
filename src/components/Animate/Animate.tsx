import { type ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimateProps {
	children: ReactNode
	delay?: number
	direction?: 'up' | 'down' | 'left' | 'right' | 'none'
	duration?: number
	className?: string
}

const offsets = {
	up: { y: 40 },
	down: { y: -40 },
	left: { x: 40 },
	right: { x: -40 },
	none: {}
}

function Animate({
	children,
	delay = 0,
	direction = 'up',
	duration = 0.6,
	className
}: AnimateProps) {
	const [shouldAnimate, setShouldAnimate] = useState(false)

	useEffect(() => {
		if (!(window as Record<string, unknown>).__PLAYWRIGHT__) {
			setShouldAnimate(true)
		}
	}, [])

	if (!shouldAnimate) {
		return <div className={className}>{children}</div>
	}

	return (
		<motion.div
			initial={{ opacity: 0, ...offsets[direction] }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export default Animate
