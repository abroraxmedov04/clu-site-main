import {
	Animate,
	Button,
	DiscountBanner,
	FAQ,
	HeroSection,
	SEO,
	TariffCard,
	WhyUsSlider
} from '@/components'
import { useFaqForAccordion } from '@/hooks/useFaq'
import heroShape from '@/assets/images/daily/wifi.svg'
import whySubscription from '@/assets/images/daily/why-subscription.svg'
import whyTrial from '@/assets/images/daily/why-trial.svg'
import whySmart from '@/assets/images/daily/why-smart.svg'
import whyAbroad from '@/assets/images/daily/why-abroad.svg'
import whyYoutube from '@/assets/images/daily/why-youtube.svg'
import whyAdblock from '@/assets/images/daily/why-adblock.svg'
import whyGaming from '@/assets/images/daily/why-gaming.svg'
import whyGreat from '@/assets/images/daily/why-great.svg'
import tariffCardBg from '../../assets/images/daily/tarif-card-bg.svg'
import styles from './Daily.module.scss'

const tariffs = [
	{
		name: 'пробный',
		price: 0,
		highlight: 'воспользуйтесь бесплатным пробным периодом',
		description: 'на 5 дней'
	},
	{
		name: 'ежедневный',
		price: 10,
		highlight: 'получите быстрый доступ',
		description: 'к любимым сервисам ровно на 24 часа'
	},
	{
		name: '7 дней',
		price: 65,
		highlight: 'оптимальное решение',
		description: 'для короткой поездки или активной рабочей недели'
	},
	{
		name: '1 месяц',
		price: 250,
		highlight: 'оптимальный баланс цены и качества',
		description: 'для постоянного использования'
	},
	{
		name: '3 месяца',
		price: 680,
		highlight: 'квартальная подписка',
		description: 'для бесперебойного обхода ограничений'
	},
	{
		name: '6 месяцев',
		price: 1300,
		highlight: 'долгосрочная защита и анонимность',
		description: 'в интернете без лишних забот'
	}
]

const whyUsItems = [
	{
		title: 'одна подписка — всё включено',
		description:
			'подключай сколько угодно устройств и пользуйся безлимитным трафиком!',
		image: whySubscription
	},
	{
		title: '5 дней бесплатно',
		description: 'попробуй все возможности VPN перед покупкой',
		image: whyTrial
	},
	{
		title: 'умный режим для всех стран',
		description:
			'только для заблокированных сервисов, блокируя рекламу и трекеры',
		image: whySmart
	},
	{
		title: 'привычные сервисы за границей',
		description:
			'Доступ к российским, белорусским, казахстанским сервисам за рубежом',
		image: whyAbroad
	},
	{
		title: 'YouTube без задержек',
		description: 'смотри любимые видео в 4К и без рекламы',
		image: whyYoutube
	},
	{
		title: 'блокировка рекламы',
		description: 'блокировка рекламы на youtube и других сервисах',
		image: whyAdblock
	},
	{
		title: 'игровые серверы',
		description:
			'минимальный пинг до Европы и ускоренная обработка игровых пакетов',
		image: whyGaming
	},
	{
		title: 'гарантия качества',
		description: 'нам доверились более 10 000 человек!',
		image: whyGreat
	}
]

function Daily() {
	const { faqItems } = useFaqForAccordion()
	return (
		<div className={styles.page}>
			<SEO
				title='Тарифы VPN — CLU VPN'
				description='Повседневный VPN от 10 руб/день. Тарифы на 1 день, 7 дней, 1 месяц, 3 и 6 месяцев. Избавьтесь от блокировок.'
				path='/daily'
			/>
			<HeroSection
				title='повседневный vpn'
				subtitle='избавьтесь от всех блокировок раз и навсегда'
				image={heroShape}
				telegramLink='https://t.me/RouterBP_bot'
			>
				<Button variant='dark'>начать</Button>
			</HeroSection>

			<section className={styles.section}>
				<Animate>
					<h2 className={styles.sectionTitle}>тарифы</h2>
				</Animate>
				<div className={styles.tariffsGrid}>
					{tariffs.map((tariff, i) => (
						<Animate key={tariff.name} delay={i * 0.08}>
							<TariffCard {...tariff} backgroundImage={tariffCardBg} />
						</Animate>
					))}
				</div>
			</section>

			<Animate>
				<WhyUsSlider items={whyUsItems} />
			</Animate>

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

export default Daily
