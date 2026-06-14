import type { RouteRecord } from 'vite-react-ssg'
import Layout from '@/Layout'
import {
	Home,
	TrialPeriod,
	Daily,
	HelpCenter,
	HelpArticle,
	Docs
} from '@/pages'

export const routes: RouteRecord[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'trial', element: <TrialPeriod /> },
			{ path: 'daily', element: <Daily /> },
			{ path: 'help', element: <HelpCenter /> },
			{
				path: 'help/:slug',
				element: <HelpArticle />
			},
			{
				path: 'docs/:slug',
				element: <Docs />,
				getStaticPaths: () => ['docs/privacy', 'docs/terms']
			}
		]
	}
]
