import { Link } from 'react-router-dom'
import clsx from 'clsx'
import arrowLink from '@/assets/icons/arrow-link.svg'
import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
	title: string
	description: string
	image?: string
	linkHref: string
	highlight?: string
}

function ServiceCard({
	title,
	description,
	image,
	linkHref,
	highlight
}: ServiceCardProps) {
	return (
		<Link to={linkHref} className={styles.card}>
			<div className={styles.content}>
				<div className={styles.header}>
					<button className={clsx(styles.arrow, styles.arrowHidden)}>
						<img src={arrowLink} alt='' />
					</button>
					<h3 className={styles.title}>{title}</h3>
					<button className={styles.arrow}>
						<img src={arrowLink} alt='' />
					</button>
				</div>
				{image && (
					<div className={styles.imageWrapper}>
						<img src={image} alt={title} className={styles.image} />
					</div>
				)}
			</div>
			<p className={styles.description}>
				{highlight && <strong>{highlight}</strong>} {description}
			</p>
		</Link>
	)
}

export default ServiceCard
