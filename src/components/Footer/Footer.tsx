import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoSvg from '@/assets/icons/logo.svg'
import telegramIcon from '@/assets/icons/telegram.svg'
import styles from './Footer.module.scss'

function Footer() {
	const location = useLocation()
	const navigate = useNavigate()

	const scrollToSection = (id: string) => {
		if (location.pathname === '/') {
			const el = document.getElementById(id)
			if (el) {
				const top = el.getBoundingClientRect().top + window.scrollY - 80
				window.scrollTo({ top, behavior: 'smooth' })
			}
		} else {
			navigate('/')
			setTimeout(() => {
				const el = document.getElementById(id)
				if (el) {
					const top = el.getBoundingClientRect().top + window.scrollY - 80
					window.scrollTo({ top, behavior: 'smooth' })
				}
			}, 100)
		}
	}

	return (
		<footer className={styles.footer}>
			<div className={styles.left}>
				<div className={styles.leftTop}>
					<Link to='/'>
						<img src={logoSvg} alt='CLU VPN' className={styles.logo} />
					</Link>
					<p className={styles.description}>
						получите доступ к сети, защищённый от блокировок
						<br />и ограничений уже сегодня
					</p>
				</div>
				<div className={styles.leftBottom}>
					<a
						href='https://t.me/RouterBP_bot'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src={telegramIcon}
							alt='Telegram'
							className={styles.telegramIcon}
						/>
					</a>
					<div className={styles.copyright}>
						<span>© 2026 — Copyright</span>
						<span>All Rights reserved</span>
					</div>
				</div>
			</div>

			<div className={styles.right}>
				<nav className={styles.nav}>
					<Link to='/' className={styles.navLink}>
						главная
					</Link>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('advantages')}
					>
						преимущества
					</button>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('services')}
					>
						услуги
					</button>
					<Link to='/help' className={styles.navLink}>
						помощь
					</Link>
				</nav>

				<div className={styles.sections}>
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>контакты</h4>
						<a
							href='https://t.me/RouterBP_bot'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.sectionLink}
						>
							поддержка
						</a>
					</div>

					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>другое</h4>
						<div className={styles.sectionList}>
							<Link to='/docs/terms' className={styles.sectionLink}>
								условия пользования
							</Link>
							<Link to='/docs/privacy' className={styles.sectionLink}>
								политика конфиденциальности
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
