import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import logoSvg from '@/assets/icons/logo.svg'
import loginIcon from '@/assets/icons/login.svg'
import burgerIcon from '@/assets/icons/burger.svg'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import chevronDownIcon from '@/assets/icons/chevron-down.svg'
import styles from './Header.module.scss'

const dropdownLinks = [
	{ to: '/trial', label: 'пробный период' },
	{ to: '/daily', label: 'vpn тарифы' }
]

const ArrowRight = () => (
	<img src={arrowRightIcon} alt='' className={styles.mobileIcon} />
)

const ChevronDown = () => (
	<img src={chevronDownIcon} alt='' className={styles.mobileIcon} />
)

interface MobileMenuProps {
	isOpen: boolean
	servicesOpen: boolean
	onToggleServices: () => void
	onClose: () => void
	onScrollTo: (id: string) => void
}

function MobileMenu({
	isOpen,
	servicesOpen,
	onToggleServices,
	onClose,
	onScrollTo
}: MobileMenuProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	const subMenuRef = useRef<HTMLDivElement>(null)
	const sheetRef = useRef<HTMLDivElement>(null)
	const dragStartY = useRef(0)
	const dragCurrentY = useRef(0)

	const onTouchMove = useCallback((e: TouchEvent) => {
		if (!sheetRef.current) return
		const delta = e.touches[0].clientY - dragStartY.current
		if (delta < 0) return
		dragCurrentY.current = delta
		sheetRef.current.style.transform = `translateY(${delta}px)`
	}, [])

	const onTouchEnd = useCallback(() => {
		document.removeEventListener('touchmove', onTouchMove)
		document.removeEventListener('touchend', onTouchEnd)
		if (!sheetRef.current) return
		sheetRef.current.style.transition = ''
		if (dragCurrentY.current > 80) {
			onClose()
		} else {
			sheetRef.current.style.transform = ''
		}
		dragCurrentY.current = 0
	}, [onClose, onTouchMove])

	const handleTouchStart = (e: React.TouchEvent) => {
		dragStartY.current = e.touches[0].clientY
		dragCurrentY.current = 0
		if (sheetRef.current) {
			sheetRef.current.style.transition = 'none'
		}
		document.addEventListener('touchmove', onTouchMove, { passive: false })
		document.addEventListener('touchend', onTouchEnd)
	}

	return (
		<>
			<div
				className={clsx(
					styles.mobileOverlay,
					isOpen && styles.mobileOverlayOpen
				)}
				onClick={onClose}
			/>
			<div
				ref={sheetRef}
				className={clsx(styles.mobileMenu, isOpen && styles.mobileMenuOpen)}
			>
				<div
					className={styles.mobileHandleArea}
					onTouchStart={handleTouchStart}
				>
					<div className={styles.mobileHandle} />
				</div>

				<button className={styles.mobileLoginBtn}>
					<span>войти</span>
					<img src={loginIcon} alt='' className={styles.mobileLoginIcon} />
				</button>

				<div className={styles.mobileNav}>
					<Link
						to='/'
						className={clsx(
							styles.mobileNavItem,
							servicesOpen && styles.mobileNavItemDimmed
						)}
						onClick={onClose}
					>
						<span>главная</span>
						<ArrowRight />
					</Link>
					<button
						className={clsx(
							styles.mobileNavItem,
							servicesOpen && styles.mobileNavItemDimmed
						)}
						onClick={() => onScrollTo('advantages')}
					>
						<span>преимущества</span>
						<ArrowRight />
					</button>
					<button
						className={clsx(
							styles.mobileNavItem,
							servicesOpen && styles.mobileNavItemActive
						)}
						onClick={onToggleServices}
					>
						<span>услуги</span>
						<span
							className={clsx(
								styles.mobileChevron,
								servicesOpen && styles.mobileChevronOpen
							)}
						>
							<ChevronDown />
						</span>
					</button>
					<div
						className={styles.subMenuWrapper}
						style={{
							height: servicesOpen
								? (subMenuRef.current?.scrollHeight ?? 'auto')
								: 0
						}}
					>
						<div ref={subMenuRef}>
							{dropdownLinks.map(dl => (
								<Link
									key={dl.to}
									to={dl.to}
									className={styles.mobileNavItem}
									onClick={onClose}
								>
									<span>{dl.label}</span>
									<ArrowRight />
								</Link>
							))}
						</div>
					</div>
					<Link
						to='/help'
						className={clsx(
							styles.mobileNavItem,
							servicesOpen && styles.mobileNavItemDimmed
						)}
						onClick={onClose}
					>
						<span>помощь</span>
						<ArrowRight />
					</Link>
				</div>
			</div>
		</>
	)
}

function Header() {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const scrollToSection = (id: string) => {
		setMobileMenuOpen(false)
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

	const closeMobile = () => {
		setMobileMenuOpen(false)
		setMobileServicesOpen(false)
	}

	return (
		<>
			<motion.header
				className={styles.header}
				initial={{ y: -60, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				<button
					className={styles.burger}
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label='Меню'
				>
					<img src={burgerIcon} alt='' />
				</button>

				<Link to='/' onClick={closeMobile}>
					<img src={logoSvg} alt='CLU VPN' className={styles.logo} />
				</Link>

				<nav
					className={styles.nav}
					aria-label='Основная навигация'
					onMouseLeave={() => setDropdownOpen(false)}
				>
					<Link to='/' className={styles.navLink}>
						главная
					</Link>
					<button
						className={styles.navLink}
						onClick={() => scrollToSection('advantages')}
					>
						преимущества
					</button>
					<div
						className={styles.dropdownWrapper}
						onMouseEnter={() => setDropdownOpen(true)}
						onMouseLeave={() => setDropdownOpen(false)}
					>
						<button
							className={styles.navLink}
							onClick={() => scrollToSection('services')}
						>
							услуги
						</button>
						<div
							className={clsx(
								styles.dropdown,
								dropdownOpen && styles.dropdownOpen
							)}
						>
							{dropdownLinks.map(dl => (
								<Link key={dl.to} to={dl.to} className={styles.dropdownLink}>
									{dl.label}
								</Link>
							))}
						</div>
					</div>
					<Link to='/help' className={styles.navLink}>
						помощь
					</Link>
				</nav>

				<button className={styles.loginBtn}>
					<span className={styles.loginText}>войти</span>
					<img src={loginIcon} alt='' className={styles.loginIcon} />
				</button>
			</motion.header>

			<MobileMenu
				isOpen={mobileMenuOpen}
				servicesOpen={mobileServicesOpen}
				onToggleServices={() => setMobileServicesOpen(!mobileServicesOpen)}
				onClose={closeMobile}
				onScrollTo={scrollToSection}
			/>
		</>
	)
}

export default Header
