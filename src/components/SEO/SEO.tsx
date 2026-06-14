import { Head } from 'vite-react-ssg'

const SITE_URL = 'https://cluvpn.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

interface SEOProps {
	title: string
	description: string
	path: string
	ogImage?: string
	jsonLd?: Record<string, unknown>
}

function SEO({
	title,
	description,
	path,
	ogImage = DEFAULT_OG_IMAGE,
	jsonLd
}: SEOProps) {
	const url = `${SITE_URL}${path}`

	const organizationLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'CLU VPN',
		url: SITE_URL,
		logo: `${SITE_URL}/favicon.svg`,
		contactPoint: {
			'@type': 'ContactPoint',
			url: 'https://t.me/RouterBP_bot',
			contactType: 'customer service'
		}
	}

	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={description} />
			<link rel='canonical' href={url} />

			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:url' content={url} />
			<meta property='og:image' content={ogImage} />
			<meta property='og:type' content='website' />
			<meta property='og:locale' content='ru_RU' />
			<meta property='og:site_name' content='CLU VPN' />

			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={ogImage} />

			<script type='application/ld+json'>
				{JSON.stringify(jsonLd ?? organizationLd)}
			</script>
		</Head>
	)
}

export default SEO
