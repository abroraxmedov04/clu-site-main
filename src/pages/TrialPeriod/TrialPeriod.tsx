import {
	Animate,
	Button,
	DiscountBanner,
	FAQ,
	HeroSection,
	SEO,
	ServiceCard
} from '@/components'
import { useFaqForAccordion } from '@/hooks/useFaq'
import heroShape from '@/assets/images/shared/hero-shape-smiley.png'
import cardTrial from '@/assets/images/shared/card-trial.png'
import cardDaily from '@/assets/images/shared/card-daily.png'
import cardRouter from '@/assets/images/shared/card-router.png'
import styles from './TrialPeriod.module.scss'

function TrialPeriod() {
	const { faqItems } = useFaqForAccordion()
	return (
		<div className={styles.page}>
			<SEO
				title='Пробный период — CLU VPN'
				description='Протестируйте CLU VPN бесплатно в течение 5 дней. Полный доступ ко всем функциям без ограничений.'
				path='/trial'
			/>
			<HeroSection
				title='пробный период'
				subtitle='протестируйте vpn перед покупкой'
				image={heroShape}
				telegramLink='https://t.me/RouterBP_bot'
			>
				<Button variant='dark'>протестировать</Button>
			</HeroSection>

			<section className={styles.section}>
				<Animate>
					<h2 className={styles.sectionTitle}>пробный период</h2>
				</Animate>
				<div className={styles.cardsGrid}>
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
							image={cardRouter}
							linkHref='/daily'
						/>
					</Animate>
				</div>
			</section>

			<Animate>
				<section className={styles.section}>
					<DiscountBanner />
				</section>
			</Animate>

			<Animate>
				<FAQ items={faqItems} />
			</Animate>
		</div>
	)
}

export default TrialPeriod
