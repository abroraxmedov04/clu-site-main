import { ViteReactSSG } from 'vite-react-ssg'
import { MotionGlobalConfig } from 'framer-motion'
import { routes } from '@/App'
import '@/styles/global.scss'

if (
	typeof window !== 'undefined' &&
	(window as Record<string, unknown>).__PLAYWRIGHT__
) {
	MotionGlobalConfig.skipAnimations = true
}

export const createRoot = ViteReactSSG({ routes })
