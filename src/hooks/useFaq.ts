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

export const FAQ_DATA: FaqItem[] = [
	{
		id: '1',
		question: 'Вопрос 1',
		answers: [
			{
				id: '1-1',
				text: 'CLU VPN шифрует ваш интернет-трафик и скрывает реальный IP-адрес, поэтому ваши действия в сети остаются конфиденциальными даже в публичных Wi-Fi сетях.'
			}
		]
	},
	{
		id: '2',
		question: 'Вопрос 2',
		answers: [
			{
				id: '2-1',
				text: 'Чтобы подключиться, скачайте приложение, войдите в аккаунт и нажмите кнопку подключения — сервер выбирается автоматически за пару секунд.'
			}
		]
	},
	{
		id: '3',
		question: 'Вопрос 3',
		answers: [
			{
				id: '3-1',
				text: 'Одну подписку можно использовать сразу на нескольких устройствах: смартфоне, планшете и компьютере под управлением iOS, Android, Windows и macOS.'
			}
		]
	},
	{
		id: '4',
		question: 'Вопрос 4',
		answers: [
			{
				id: '4-1',
				text: 'Мы не ведём логи вашей активности и не передаём данные третьим лицам — политика no-logs гарантирует, что история посещений нигде не сохраняется.'
			}
		]
	},
	{
		id: '5',
		question: 'Вопрос 5',
		answers: [
			{
				id: '5-1',
				text: 'Скорость соединения остаётся высокой благодаря современным протоколам и оптимизированным серверам, поэтому стриминг и загрузки работают без задержек.'
			}
		]
	},
	{
		id: '6',
		question: 'Вопрос 6',
		answers: [
			{
				id: '6-1',
				text: 'ответ 6'
			}
		]
	}
]

export function useFaq(search?: string) {
	const [items, setItems] = useState<FaqItem[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!search) return
		let active = true
		const load = async () => {
			setLoading(true)
			try {
				const res = await fetch(
					`${API_URL}?search=${encodeURIComponent(search)}`
				)
				const data: FaqItem[] = await res.json()
				if (active) setItems(data)
			} catch {
				if (active) setItems([])
			} finally {
				if (active) setLoading(false)
			}
		}
		load()
		return () => {
			active = false
		}
	}, [search])

	return { items: search ? items : [], loading: search ? loading : false }
}

export function useFaqForAccordion() {
	const faqItems = FAQ_DATA.map(item => ({
		question: item.question,
		answer: item.answers.map(a => a.text).join('\n')
	}))
	return { faqItems, loading: false }
}

export function useFaqById(id: string | undefined) {
	const [item, setItem] = useState<FaqItem | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!id) return
		let active = true
		const load = async () => {
			setLoading(true)
			try {
				const res = await fetch(API_URL)
				const data: FaqItem[] = await res.json()
				if (active) setItem(data.find(q => q.id === id) ?? null)
			} catch {
				if (active) setItem(null)
			} finally {
				if (active) setLoading(false)
			}
		}
		load()
		return () => {
			active = false
		}
	}, [id])

	return { item, loading }
}
