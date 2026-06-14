import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Animate, FAQ, HeroSection, SEO } from '@/components'
import { useFaq } from '@/hooks/useFaq'
import heroShape from '@/assets/images/shared/hero-shape-questions.png'
import searchIcon from '@/assets/icons/search.svg'
import styles from './HelpCenter.module.scss'

function useDebounce(value: string, delay: number) {
	const [debounced, setDebounced] = useState(value)
	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay)
		return () => clearTimeout(timer)
	}, [value, delay])
	return debounced
}

function HelpCenter() {
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)
	const isSearching = debouncedSearch.length > 0
	const { items, loading } = useFaq(isSearching ? debouncedSearch : undefined)

	const faqItems = items.map(item => ({
		question: item.question,
		answer: item.answers.map(a => a.text).join('\n')
	}))

	return (
		<div className={styles.page}>
			<SEO
				title='Справочный центр — CLU VPN'
				description='Ответы на частые вопросы о CLU VPN. Подключение, настройка, тарифы и техническая поддержка.'
				path='/help'
			/>
			<HeroSection
				title='справочный центр'
				subtitle='ответы на частые вопросы'
				image={heroShape}
				telegramLink='https://t.me/RouterBP_bot'
			/>

			<Animate>
				<section className={styles.section}>
					<h2 className={styles.heading}>
						тут вы можете найти ответы на самые частые вопросы
					</h2>

					<div className={styles.searchWrapper}>
						<input
							type='text'
							placeholder='введите свой вопрос...'
							value={search}
							onChange={e => setSearch(e.target.value)}
							className={styles.searchInput}
						/>
						<button className={styles.searchBtn}>
							<img src={searchIcon} alt='Поиск' className={styles.searchIcon} />
						</button>
					</div>
				</section>
			</Animate>

			{loading ? (
				<p className={styles.loadingText}>загрузка...</p>
			) : isSearching ? (
				<Animate>
					<section className={styles.resultsSection}>
						{items.length === 0 ? (
							<p className={styles.emptyText}>ничего не найдено</p>
						) : (
							<div className={styles.resultsList}>
								{items.map(item => (
									<Link
										key={item.id}
										to={`/help/${item.id}`}
										className={styles.resultCard}
									>
										<h3 className={styles.resultQuestion}>{item.question}</h3>
										{item.answers[0] && (
											<p className={styles.resultAnswer}>
												{item.answers[0].text}
											</p>
										)}
									</Link>
								))}
							</div>
						)}
					</section>
				</Animate>
			) : (
				<Animate>
					<FAQ items={faqItems} />
				</Animate>
			)}
		</div>
	)
}

export default HelpCenter
