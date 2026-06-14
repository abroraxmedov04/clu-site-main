import { useParams } from 'react-router-dom'
import { SEO, Animate } from '@/components'
import styles from './Docs.module.scss'

const titles: Record<string, string> = {
	privacy: 'Политика конфиденциальности',
	terms: 'Условия пользования'
}

function Docs() {
	const { slug } = useParams<{ slug: string }>()
	const title = titles[slug ?? ''] ?? 'Документ'

	return (
		<div className={styles.page}>
			<SEO
				title={`${title} — CLU VPN`}
				description={`${title} сервиса CLU VPN`}
				path={`/docs/${slug ?? ''}`}
			/>
			<Animate>
				<div>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.placeholder}>пример текста</p>
				</div>
			</Animate>
		</div>
	)
}

export default Docs
