import React, {createContext, useCallback, useContext, useState} from 'react'

export interface BettingSite {
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

const bettingSites: BettingSite[] = [
  {
    portaria: '123/2024',
    denominacaoSocial: 'Bet Nacional LTDA',
    cnpj: '12.345.678/0001-99',
    marcas: ['BetNacional'],
    dominios: ['betnacional.com', 'www.betnacional.com'],
    requerimento: 'REQ-2024/001'
  },
  {
    portaria: '456/2024',
    denominacaoSocial: 'PixBet Brasil S.A.',
    cnpj: '98.765.432/0001-11',
    marcas: ['PixBet'],
    dominios: ['pixbet.com'],
    requerimento: 'REQ-2024/002'
  },
  {
    portaria: '789/2024',
    denominacaoSocial: 'Aposta Legal Ltda',
    cnpj: '55.444.333/0001-22',
    marcas: ['ApostaLegal'],
    dominios: ['aposta.legal'],
    requerimento: 'REQ-2024/003'
  }
]

function normalizeDomain(domain: string) {
  return domain.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase()
}

export const BettingCheckerProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BettingResult | null>(null)

  const checkDomain = useCallback(async (input: string) => {
    setLoading(true)
    setResult(null)

    // try to extract domain
    let domain = ''
    try {
      const maybeUrl = input.trim()
      if (!maybeUrl) {
        domain = ''
      } else {
        // If starts with protocol, use URL, else prepend https:// to parse
        const toParse = /^(https?:)?\/\//i.test(maybeUrl) ? maybeUrl : `https://${maybeUrl}`
        const parsed = new URL(toParse)
        domain = normalizeDomain(parsed.hostname)
      }
    } catch (e) {
      domain = normalizeDomain(input)
    }

    // simulate delay
    await new Promise(res => setTimeout(res, 1000))

    let resObj: BettingResult
    if (!domain || domain.indexOf('.') === -1) {
      resObj = {status: 'invalid'}
    } else {
      // match against list (normalize both)
      const found = bettingSites.find(site => site.dominios.some(d => normalizeDomain(d) === domain))
      if (found) {
        resObj = {status: 'valid', data: found}
      } else {
        resObj = {status: 'suspect'}
      }
    }

    setResult(resObj)
    setLoading(false)
    return resObj
  }, [])

  return (
    <BettingCheckerContext.Provider value={{loading, result, checkDomain}}>
      {children}
    </BettingCheckerContext.Provider>
  )
}

export function useBettingChecker() {
  const ctx = useContext(BettingCheckerContext)
  if (!ctx) throw new Error('useBettingChecker must be used within BettingCheckerProvider')
  return ctx
}

export default BettingCheckerContext
