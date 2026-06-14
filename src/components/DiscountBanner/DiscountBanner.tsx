import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import styles from './DiscountBanner.module.scss'

function useNumberTicker(target: number, duration = 1500) {
	const [value, setValue] = useState(0)
	const ref = useRef<HTMLSpanElement>(null)
	const isInView = useInView(ref, { once: true })

	useEffect(() => {
		if (!isInView) return
		const start = performance.now()
		const tick = (now: number) => {
			const progress = Math.min((now - start) / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3)
			setValue(Math.round(eased * target))
			if (progress < 1) requestAnimationFrame(tick)
		}
		requestAnimationFrame(tick)
	}, [isInView, target, duration])

	return { value, ref }
}

function DiscountBanner() {
	const { value, ref } = useNumberTicker(15)

	return (
		<section className={styles.banner}>
			<div className={styles.left}>
				<h2 className={styles.title}>скидка</h2>
				<p className={styles.subtitle}>на первую покупку</p>
			</div>
			<div>
				<span className={styles.percent} ref={ref}>
					{value}%
				</span>
				<p className={styles.note}>
					скидка варьируется в зависимости от тарифа
				</p>
			</div>
		</section>
	)
}

export default DiscountBanner
