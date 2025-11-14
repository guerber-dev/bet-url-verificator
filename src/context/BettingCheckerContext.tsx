// biome-ignore assist/source/organizeImports: <explanation>
import {betsData} from '@/api/betsData'
import {Analytics} from '@/shared/config/Analytics/Analytics'
import type React from 'react'
import {createContext, useCallback, useContext, useState} from 'react'

export interface BettingSite {
	index?: number
	portaria: string
	denominacaoSocial: string
	cnpj: string
	marcas: string[]
	dominios: string[]
	requerimento: string
}

export type BettingStatus = 'valid' | 'suspect' | 'invalid'

export interface BettingResult {
	status: BettingStatus
	data?: BettingSite
}

interface ContextValue {
	loading: boolean
	result: BettingResult | null
	checkDomain: (input: string) => Promise<BettingResult>
}

const BettingCheckerContext = createContext<ContextValue | undefined>(undefined)

// fazer tratativa para caso retorno seja null
function normalizeDomain(domain: string) {
	const sanitized = (domain ?? '').trim()
	return sanitized
		.replace(/^https?:\/\//, '')
		.replace(/^www\./, '')
		.split('/')[0]!
		.toLowerCase()
}

export const BettingCheckerProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children
}) => {
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<BettingResult | null>(null)

	const checkDomain = useCallback(async (input: string) => {
		setLoading(true)
		setResult(null)

		// try to extract domain
		let domain = ''
		try {
			const maybeUrl = input.trim()
			if (maybeUrl) {
				// If starts with protocol, use URL, else prepend https:// to parse
				const toParse = /^(https?:)?\/\//i.test(maybeUrl)
					? maybeUrl
					: `https://${maybeUrl}`
				const parsed = new URL(toParse)
				domain = normalizeDomain(parsed.hostname)
			} else {
				domain = ''
			}
		} catch (e) {
			domain = normalizeDomain(input)
		}

		// simulate delay
		await new Promise(res => setTimeout(res, 1000))

		let resObj: BettingResult;
		if (!domain || domain.indexOf('.') === -1) {
			resObj = { status: 'invalid' };
			Analytics.trackInvalidDomain(domain);
		} else {
			Analytics.trackDomainChecked(domain);
			const found = betsData.find((site: BettingSite) => {
				return site.dominios.some((d: string) => normalizeDomain(d) === domain);
			});
			if (found) {
				resObj = { status: 'valid', data: found };
				Analytics.trackLegalSite(domain, found.marcas[0] ?? '');
			} else {
				resObj = { status: 'suspect' };
				Analytics.trackSuspectSite(domain);
			}
		}
		setResult(resObj);
		setLoading(false);
		return resObj;
	}, []);

	return (
		<BettingCheckerContext.Provider value={{loading, result, checkDomain}}>
			{children}
		</BettingCheckerContext.Provider>
	)
}

export function useBettingChecker() {
	const ctx = useContext(BettingCheckerContext)
	if (!ctx)
		throw new Error(
			'useBettingChecker must be used within BettingCheckerProvider'
		)
	return ctx
}

export default BettingCheckerContext
