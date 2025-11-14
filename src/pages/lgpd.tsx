import { useNavigate } from "react-router-dom";

export default function Lgpd() {
	const navigator = useNavigate()
	return (
		<div className="max-w-2xl mx-auto px-4 py-8 text-gray-900">
			<h1 className="text-2xl font-bold mb-4">Política de Privacidade – Bet ou Fake</h1>
			<div className="text-sm text-gray-600 mb-6">Última atualização: 14/11/2025</div>
			<div className="space-y-4">
				<p>
					O Bet ou Fake respeita a sua privacidade e se compromete a manter total transparência sobre como os dados são utilizados no site.
				</p>
				<h2 className="text-lg font-semibold mt-6">Informações que coletamos</h2>
				<p>
					O site não coleta quaisquer informações pessoais, como nome, e-mail, telefone, endereço ou qualquer dado que possa identificar o usuário.
				</p>
				<p>
					Quando você utiliza a barra de busca, o texto digitado não é armazenado em nenhum banco de dados.
				</p>
				<h2 className="text-lg font-semibold mt-6">Cookies e dados anônimos</h2>
				<p>
					Utilizamos apenas o Firebase Analytics, que registra informações estritamente anônimas, como:
				</p>
				<ul className="list-disc ml-6">
					<li>páginas visitadas</li>
					<li>tempo de navegação</li>
					<li>interações gerais no site</li>
				</ul>
				<p>
					Esses dados são utilizados exclusivamente para entender o uso da plataforma e aprimorar sua experiência.
				</p>
				<p>
					Nenhum dado pessoal ou sensível é coletado, tratado ou compartilhado.
				</p>
				<h2 className="text-lg font-semibold mt-6">Segurança</h2>
				<p>
					Todas as informações coletadas de forma anônima são processadas de modo agregado, sem qualquer possibilidade de identificação individual.
				</p>
				<h2 className="text-lg font-semibold mt-6">Transparência</h2>
				<p>
					O uso do site é completamente livre e não requer cadastro.<br />
					Nosso objetivo é apenas oferecer uma ferramenta que auxilia a verificar se um link está relacionado a casas de apostas autorizadas no Brasil.
				</p>
				<h2 className="text-lg font-semibold mt-6">Contato</h2>
				<p>
					Caso tenha dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail <a className="text-primary underline" href="mailto:betoufake@gmail.com">betoufake@gmail.com</a>.
				</p>
			</div>
				const navigate = useNavigate()
				<div className="mt-8">
					<button
						type="button"
						onClick={() => navigator('/')}
						className="inline-block bg-primary text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-primary/90 transition"
					>
						Voltar para Home
					</button>
				</div>
		</div>
	)
}
