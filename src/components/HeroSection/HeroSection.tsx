import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import telegramIcon from '@/assets/icons/telegram-hero.svg'
import styles from './HeroSection.module.scss'

interface HeroSectionProps {
	title: string
	subtitle: string
	children?: ReactNode
	image?: string
	telegramLink?: string
}

function HeroSection({
	title,
	subtitle,
	children,
	image,
	telegramLink
}: HeroSectionProps) {
	return (
		<motion.section
			className={styles.hero}
			aria-label={title}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className={styles.content}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
				<div className={styles.actions}>
					{children}
					{telegramLink && (
						<a
							href={telegramLink}
							target='_blank'
							rel='noopener noreferrer'
							className={styles.telegramBtn}
						>
							<img
								src={telegramIcon}
								alt='Telegram'
								className={styles.telegramIcon}
							/>
						</a>
					)}
				</div>
			</div>
			{image && (
				<div className={styles.imageWrapper}>
					<img src={image} alt='' className={styles.image} />
				</div>
			)}
		</motion.section>
	)
}

export default HeroSection
