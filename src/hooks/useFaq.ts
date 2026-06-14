import { useEffect, useState } from 'react'

const API_URL = 'http://77.232.132.223:8000/api/faq'

interface FaqAnswer {
	id: string
	text: string
}

export interface FaqItem {
	id: string
	question: string
	answers: FaqAnswer[]
}

export function useFaq(search?: string) {
	const [items, setItems] = useState<FaqItem[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		const url = search
			? `${API_URL}?search=${encodeURIComponent(search)}`
			: API_URL
		fetch(url)
			.then(res => res.json())
			.then((data: FaqItem[]) => setItems(data))
			.catch(() => setItems([]))
			.finally(() => setLoading(false))
	}, [search])

	return { items, loading }
}

export function useFaqForAccordion() {
	const { items, loading } = useFaq()
	const faqItems = items.map(item => ({
		question: item.question,
		answer: item.answers.map(a => a.text).join('\n')
	}))
	return { faqItems, loading }
}

export function useFaqById(id: string | undefined) {
	const [item, setItem] = useState<FaqItem | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!id) return
		setLoading(true)
		fetch(API_URL)
			.then(res => res.json())
			.then((data: FaqItem[]) => {
				const found = data.find(q => q.id === id) ?? null
				setItem(found)
			})
			.catch(() => setItem(null))
			.finally(() => setLoading(false))
	}, [id])

	return { item, loading }
}
