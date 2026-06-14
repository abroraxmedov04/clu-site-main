import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Animate, FAQ, SEO, ServiceCard } from '@/components'
import { useFaqForAccordion } from '@/hooks/useFaq'
import heroBg from '@/assets/images/home/hero-bg.svg'
import cardTrial from '@/assets/images/shared/card-trial.png'
import cardDaily from '@/assets/images/shared/card-daily.png'
import cardRouter from '@/assets/images/shared/card-router.png'
import advDevices from '@/assets/images/home/devices.svg'
import advBrowser from '@/assets/images/home/advbrowser.svg'
import advCalendar from '@/assets/images/home/adv-calendar.svg'
import advGlobe from '@/assets/images/home/adv-globe.svg'
import advNoads from '@/assets/images/home/adv-noads.svg'
import styles from './Home.module.scss'

function Home() {
	const { faqItems } = useFaqForAccordion()
	return (
		<div className={styles.page}>
			<SEO
				title='CLU VPN — быстрый и доступный VPN с выборочной маршрутизацией'
				description='Надёжный VPN-сервис с выборочной маршрутизацией. Пробный период 5 дней бесплатно. Тарифы от 10 руб/день.'
				path='/'
			/>

			<section className={styles.hero}>
				<motion.img
					src={heroBg}
					alt=''
					className={styles.heroBg}
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2, ease: 'easeOut' }}
				/>
				<div className={styles.heroContent}>
					<motion.span
						className={styles.heroLabel}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						<span className={styles.heroDot} />
						обходит любые блокировки
					</motion.span>
					<motion.h1
						className={styles.heroTitle}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						Быстрый и доступный VPN
						<br className={styles.heroBreak} /> с выборочной маршрутизацией
					</motion.h1>
					<motion.div
						className={styles.heroButtons}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.7 }}
					>
						<Link to='/#trial' className={styles.heroBtnPrimary}>
							подключиться
						</Link>
						<Link to='/#advantages' className={styles.heroBtnGlass}>
							преимущества
						</Link>
					</motion.div>
				</div>
			</section>

			<section className={styles.advantages} id='advantages'>
				<Animate>
					<h2 className={styles.sectionTitle}>
						наши <em>преимущества</em>
					</h2>
				</Animate>
				<div className={styles.advTopRow}>
					<Animate delay={0.1}>
						<div className={styles.advCard}>
							<p className={styles.advText}>
								<strong>одна подписка - все включено </strong>
								<span>
									подключай сколько угодно устройств и пользуйся безлимитным
									трафиком
								</span>
							</p>
							<div className={styles.advImageWrapper}>
								<img src={advDevices} alt='' className={styles.advImage} />
							</div>
						</div>
					</Animate>
					<Animate delay={0.2}>
						<div className={styles.advCard}>
							<p className={styles.advText}>
								<strong>умный режим </strong>
								<span>
									включается только для заблокированных сервисов, блокируя
									назойливую рекламу и трекеры
								</span>
							</p>
							<div className={styles.advImageWrapper}>
								<img src={advBrowser} alt='' className={styles.advImage} />
							</div>
						</div>
					</Animate>
				</div>
				<Animate>
					<div className={styles.advBottomRow}>
						<div className={styles.advCard}>
							<div className={styles.advImageWrapper}>
								<img src={advCalendar} alt='' className={styles.advImage} />
							</div>
							<p className={styles.advText}>
								<strong>5 дней бесплатно </strong>
								<span>
									для тестирования всех возможностей VPN перед покупкой
								</span>
							</p>
						</div>
						<div className={styles.advCard}>
							<div className={styles.advImageWrapper}>
								<img src={advGlobe} alt='' className={styles.advImage} />
							</div>
							<p className={styles.advText}>
								<strong>доступ за рубежом</strong>
								<span> к российским, белоусским и казахстанским сервисам</span>
							</p>
						</div>
						<div className={styles.advCard}>
							<div className={styles.advImageWrapper}>
								<img src={advNoads} alt='' className={styles.advImage} />
							</div>
							<p className={styles.advText}>
								<strong>блокировка рекламы </strong>
								<span>на youtube и других сервисах</span>
							</p>
						</div>
					</div>
				</Animate>
			</section>

			<section className={styles.section} id='services'>
				<Animate>
					<h2 className={styles.sectionTitle}>наши услуги</h2>
				</Animate>
				<div className={styles.servicesGrid}>
					<Animate delay={0.1}>
						<ServiceCard
							title='пробный период'
							highlight='воспользуйтесь пробным бесплатным периодом'
							description='на 5 дней'
							linkHref='/trial'
							image={cardTrial}
						/>
					</Animate>
					<Animate delay={0.2}>
						<ServiceCard
							title='повседневный vpn'
							highlight='приобретите VPN'
							description='по низкой цене и защитите себя в интернете'
							linkHref='/daily'
							image={cardDaily}
						/>
					</Animate>
					<Animate delay={0.3}>
						<ServiceCard
							title='vpn для роутера'
							highlight='воспользуйтесь тарифом для обхода белых списков'
							description='в разных регионах'
							linkHref='/daily'
							image={cardRouter}
						/>
					</Animate>
				</div>
			</section>

			<Animate>
				<section className={styles.sectionFaq}>
					<FAQ items={faqItems} />
				</section>
			</Animate>
		</div>
	)
}

export default Home
