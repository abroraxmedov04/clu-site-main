import { useRef, useState } from 'react'
import clsx from 'clsx'
import plusIcon from '@/assets/icons/plus.svg'
import styles from './FAQ.module.scss'

interface FAQItem {
	question: string
	answer: string
}

interface FAQProps {
	items: FAQItem[]
}

function FAQ({ items }: FAQProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggle = (index: number) => {
		setOpenIndex(prev => (prev === index ? null : index))
	}

	return (
		<section className={styles.faq} aria-label='FAQ'>
			<h2 className={styles.title}>FAQ</h2>
			<div className={styles.list}>
				{items.map((item, index) => (
					<FAQItemRow
						key={index}
						item={item}
						isOpen={openIndex === index}
						onToggle={() => toggle(index)}
					/>
				))}
			</div>
		</section>
	)
}

interface FAQItemRowProps {
	item: FAQItem
	isOpen: boolean
	onToggle: () => void
}

function FAQItemRow({ item, isOpen, onToggle }: FAQItemRowProps) {
	const contentRef = useRef<HTMLDivElement>(null)

	return (
		<div className={styles.item}>
			<button className={styles.question} onClick={onToggle}>
				<span>{item.question}</span>
				<span className={clsx(styles.icon, isOpen && styles.iconOpen)}>
					<img src={plusIcon} alt='' />
				</span>
			</button>
			<div
				className={styles.answerWrapper}
				style={{
					height: isOpen ? (contentRef.current?.scrollHeight ?? 'auto') : 0
				}}
			>
				<div ref={contentRef} className={styles.answer}>
					{item.answer}
				</div>
			</div>
		</div>
	)
}

export default FAQ
