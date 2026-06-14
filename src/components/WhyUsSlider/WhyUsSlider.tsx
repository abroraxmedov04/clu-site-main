import { useRef, useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import arrowRight from '@/assets/icons/arrow-right.svg'
import styles from './WhyUsSlider.module.scss'

interface WhyUsItem {
	title: string
	description: string
	image: string
}

interface WhyUsSliderProps {
	items: WhyUsItem[]
}

function WhyUsSlider({ items }: WhyUsSliderProps) {
	const trackRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(true)

	const updateScrollState = useCallback(() => {
		const el = trackRef.current
		if (!el) return
		setCanScrollLeft(el.scrollLeft > 1)
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
	}, [])

	useEffect(() => {
		const el = trackRef.current
		if (!el) return
		updateScrollState()
		el.addEventListener('scroll', updateScrollState, { passive: true })
		return () => el.removeEventListener('scroll', updateScrollState)
	}, [updateScrollState])

	const isDragging = useRef(false)
	const startX = useRef(0)
	const scrollStart = useRef(0)

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging.current = true
		startX.current = e.pageX
		scrollStart.current = trackRef.current?.scrollLeft ?? 0
		if (trackRef.current) trackRef.current.style.scrollSnapType = 'none'
	}

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isDragging.current || !trackRef.current) return
		e.preventDefault()
		const delta = e.pageX - startX.current
		trackRef.current.scrollLeft = scrollStart.current - delta
	}, [])

	const handleMouseUp = useCallback(() => {
		isDragging.current = false
		if (trackRef.current) trackRef.current.style.scrollSnapType = ''
	}, [])

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [handleMouseMove, handleMouseUp])

	const scroll = (direction: 'left' | 'right') => {
		if (!trackRef.current) return
		const scrollAmount = 383
		trackRef.current.scrollBy({
			left: direction === 'right' ? scrollAmount : -scrollAmount,
			behavior: 'smooth'
		})
	}

	return (
		<section className={styles.section} aria-label='Почему мы'>
			<div className={styles.header}>
				<h2 className={styles.title}>почему мы?</h2>
				<div className={styles.arrows}>
					<button
						className={clsx(styles.arrowBtn, !canScrollLeft && styles.disabled)}
						onClick={() => scroll('left')}
						disabled={!canScrollLeft}
						aria-label='Назад'
					>
						<img src={arrowLeft} alt='' className={styles.arrowIcon} />
					</button>
					<button
						className={clsx(
							styles.arrowBtn,
							!canScrollRight && styles.disabled
						)}
						onClick={() => scroll('right')}
						disabled={!canScrollRight}
						aria-label='Вперёд'
					>
						<img src={arrowRight} alt='' className={styles.arrowIcon} />
					</button>
				</div>
			</div>
			<div
				className={styles.track}
				ref={trackRef}
				onMouseDown={handleMouseDown}
			>
				{items.map((item, i) => (
					<div key={i} className={styles.card}>
						<h3 className={styles.cardTitle}>{item.title}</h3>
						<p className={styles.cardDescription}>{item.description}</p>
						<div className={styles.cardImageWrapper}>
							<img src={item.image} alt='' className={styles.cardImage} />
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default WhyUsSlider
