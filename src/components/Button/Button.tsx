import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline' | 'dark'
	size?: 'sm' | 'md'
}

function Button({
	variant = 'primary',
	size = 'md',
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={clsx(styles.button, styles[variant], styles[size], className)}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
