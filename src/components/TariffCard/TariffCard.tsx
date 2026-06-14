import arrowLink from '@/assets/icons/arrow-link.svg'
import styles from './TariffCard.module.scss'

interface TariffCardProps {
	name: string
	price: number
	currency?: string
	description: string
	highlight?: string
}

function TariffCard({
	name,
	price,
	currency = 'руб',
	description,
	highlight
}: TariffCardProps) {
	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<h3 className={styles.name}>{name}</h3>
				<div className={styles.priceRow}>
					<span className={styles.price}>{price}</span>
					<span className={styles.currency}>{currency}</span>
					<button className={styles.arrow}>
						<img src={arrowLink} alt='' />
					</button>
				</div>
			</div>
			<p className={styles.description}>
				{highlight && <strong>{highlight}</strong>} {description}
			</p>
		</div>
	)
}

export default TariffCard
