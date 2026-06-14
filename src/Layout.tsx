import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer, Header } from '@/components'

function ScrollToTop() {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

function Layout() {
	return (
		<>
			<ScrollToTop />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Layout
