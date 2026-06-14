import { useParams } from 'react-router-dom'
import { Animate, SEO } from '@/components'
import { useFaqById } from '@/hooks/useFaq'
import searchIcon from '@/assets/icons/search.svg'
import styles from './HelpArticle.module.scss'

function HelpArticle() {
	const { slug } = useParams<{ slug: string }>()
	const { item, loading } = useFaqById(slug)

	if (loading) {
		return (
			<div className={styles.page}>
				<SEO title='Загрузка — CLU VPN' description='' path={`/help/${slug}`} />
				<p className={styles.loadingText}>загрузка...</p>
			</div>
		)
	}

	if (!item) {
		return (
			<div className={styles.page}>
				<SEO title='Статья не найдена — CLU VPN' description='' path='/help' />
				<h1 className={styles.articleTitle}>Статья не найдена</h1>
			</div>
		)
	}

	return (
		<div className={styles.page}>
			<SEO
				title={`${item.question} — CLU VPN`}
				description={item.answers[0]?.text ?? ''}
				path={`/help/${slug}`}
			/>

			<div className={styles.searchWrapper}>
				<input
					type='text'
					placeholder='введите свой вопрос...'
					className={styles.searchInput}
					readOnly
				/>
				<img src={searchIcon} alt='' className={styles.searchIcon} />
			</div>

			<Animate>
				<article className={styles.article}>
					<div className={styles.body}>
						<h1 className={styles.articleTitle}>{item.question}</h1>
						<div className={styles.articleContent}>
							{item.answers.map(answer => (
								<p key={answer.id} className={styles.articleLine}>
									{answer.text}
								</p>
							))}
						</div>
					</div>
				</article>
			</Animate>
		</div>
	)
}

export default HelpArticle
