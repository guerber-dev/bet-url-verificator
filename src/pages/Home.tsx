import React, {useId, useRef, useState} from 'react'
import {useBettingChecker} from '../context/BettingCheckerContext'

export function Home() {
	const {loading, result, checkDomain} = useBettingChecker()
	const [input, setInput] = useState('')
	const inputId = useId()
	const aboutRef = useRef<HTMLElement | null>(null)
	const howRef = useRef<HTMLElement | null>(null)
	const contactRef = useRef<HTMLElement | null>(null)

	const handleSearch = async (e?: React.FormEvent) => {
		e?.preventDefault()
		await checkDomain(input)
	}

	const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
		ref.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
	}

	return (
		<div className="min-h-screen font-sans text-gray-900 bg-white/90">
			<header className="w-full sticky top-0 bg-white/90 backdrop-blur-sm z-30 border-b">
				<div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
					<img src="/logo.png" alt="VerificaBet" className="h-20 w-auto" />
					<nav className="space-x-3 text-sm">
						<button className="px-3 py-2 rounded-md hover:underline" onClick={() => scrollTo(aboutRef)}>Sobre</button>
						<button className="px-3 py-2 rounded-md hover:underline" onClick={() => scrollTo(howRef)}>Como usar</button>
						<button className="px-3 py-2 rounded-md hover:underline" onClick={() => scrollTo(contactRef)}>Contato</button>
					</nav>
				</div>
			</header>

			<main className="max-w-3xl mx-auto px-4 py-8">
				<section aria-labelledby="search" className="mb-8">
					<h1 id="search" className="text-2xl font-bold mb-3">É Bet ou Fake? — Consulte um  link</h1>
					<p className="text-sm text-gray-600 mb-4">Cole aqui o link ou domínio que você quer verificar (ex: betnacional.com)</p>

					<form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
						<label htmlFor={inputId} className="sr-only">Domínio</label>
						<input
							id={inputId}
							value={input}
							onChange={e => setInput(e.target.value)}
							placeholder="ex: betnacional.com or https://www.betnacional.com"
							className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Domínio ou link para verificação"
						/>
						<button
							type="submit"
							className="bg-primary text-white rounded-lg px-4 py-3 font-medium disabled:opacity-60"
							disabled={loading}
						>
							{loading ? 'Buscando...' : 'Buscar'}
						</button>
					</form>

					<div className="mt-4">
						<SearchResult result={result} />
					</div>
				</section>

				<section ref={aboutRef} className="mb-8" aria-labelledby="about">
					<h2 id="about" className="text-xl font-semibold mb-2">Sobre</h2>
					<p className="text-gray-700">
					<p>🎯 <strong>Sabe aquele link daquela plataforma “bugada que tá pagando muito fácil”?</strong><br/><br/>💸 Pois é... pode ser golpe! 😬</p><br/>
						<p>No <strong>Bet ou Fake</strong>, você cola o link e a gente te mostra se ele pertence a uma <strong>casa de apostas legalizada pelo Governo Brasileiro</strong> ✅ ou se <strong>pode ser suspeito</strong> ⚠️.</p><br/>
						<p>Nosso objetivo é simples: <strong>te ajudar a não cair em ciladas</strong> e apostar só em lugares <strong>seguros e confiáveis</strong> 💪🎰</p>
					</p>
				</section>

				<section ref={howRef} className="mb-8" aria-labelledby="how">
					<h2 id="how" className="text-xl font-semibold mb-2">Como usar</h2>
					<div className="prose max-w-none text-gray-700">
						<p>1️⃣ Copie o link que você acha suspeito.</p>
						<p>2️⃣ Cole na nossa barra de busca.</p>
						<p>3️⃣ Clique em ‘Buscar’ e descubra se o link é confiável.</p>
					</div>
				</section>

				<footer ref={contactRef} className="mt-12 border-t pt-6">
					<div className="flex flex-col sm:flex-row sm:justify-between items-start">
						<div>
							<div>
								<div className="text-lg font-semibold">Última atualização</div>
								<div className="text-sm text-gray-600">13/11/2025</div>
							</div>
							<div className='mt-1'>
								<div className="text-lg font-semibold">Bet ou Fake</div>
								<div className="text-sm text-gray-600">contato@example.com</div>
							</div>
						</div>
						<div className="mt-4 sm:mt-0 text-sm text-gray-600">
							<div>© {new Date().getFullYear()} Bet ou Fake</div>
							<button className="mt-2 text-sm text-primary hover:underline" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Voltar ao topo</button>
						</div>
					</div>
				</footer>
			</main>
		</div>
	)
}

function SearchResult({result}:{result: any}){
	if (!result) return null

	const base = 'rounded-lg p-4 mt-2 transition-opacity duration-300 ease-in-out'

	if (result.status === 'invalid'){
		return (
			<div className={`${base} bg-danger/10 border border-red-200 text-danger flex items-center gap-4`}>
				<div className="text-4xl">❌</div>
				<div>
					<div className="font-semibold text-red-700">Link inválido</div>
					<div className="text-sm text-red-600">O link informado não é válido. Verifique se digitou corretamente (ex: betnacional.com).</div>
				</div>
			</div>
		)
	}

	if (result.status === 'suspect'){
		return (
			<div className={`${base} bg-secondary/10 border border-yellow-200 text-yellow-800 flex flex-col sm:flex-row sm:items-center gap-4`}>
				<div className="text-3xl">🤔</div>
				<div>
					<div className="font-semibold">Domínio não encontrado na lista oficial</div>
					<div className="text-sm">Este domínio não consta na lista de casas autorizadas. Recomendamos verificar diretamente no site oficial do Governo.</div>
					<a className="text-sm text-blue-600 hover:underline" href="https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/lista-de-empresas" target="_blank" rel="noreferrer">Página oficial do Governo</a>
					<div className="text-sm text-gray-600 mt-1">Email: contato@example.com</div>
				</div>
			</div>
		)
	}

	// valid
	const data = result.data
	return (
		<div className={`${base} bg-green-50 border border-green-200 text-green-800 flex flex-col sm:flex-row sm:items-center gap-4`}>
			<div className="text-4xl">😄</div>
			<div>
				<div className="font-semibold">O domínio informado pertence a uma casa de apostas autorizada pelo Governo Brasileiro.</div>
				<div className="text-sm mt-2">Denominação: <span className="font-medium">{data.denominacaoSocial}</span></div>
				<div className="text-sm">CNPJ: <span className="font-medium">{data.cnpj}</span></div>
				<div className="text-sm">Portaria: <span className="font-medium">{data.portaria}</span></div>
			</div>
		</div>
	)
}

export default Home
