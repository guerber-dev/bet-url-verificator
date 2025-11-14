// Analytics/Analytics.ts
import {firebaseSendEvent} from '../firebase/firebaseMethods'

// Nomes dos eventos usados pelo App
export type AppEvents =
	| 'page_view'
	| 'domain_checked'
	| 'invalid_domain'
	| 'legal_site'
	| 'suspect_site'
	| 'cta_clicked'

//
// ======= Funções de alto nível =======
//

function trackPageView(page: string) {
	firebaseSendEvent('page_view', {page})
}

function trackDomainChecked(domain: string) {
	firebaseSendEvent('domain_checked', {domain})
}

function trackInvalidDomain(domain: string) {
	firebaseSendEvent('invalid_domain', {domain})
}

function trackLegalSite(domain: string, matchedBrand: string) {
	firebaseSendEvent('legal_site', {
		domain,
		matchedBrand
	})
}

function trackSuspectSite(domain: string) {
	firebaseSendEvent('suspect_site', {domain})
}

function trackCTA(label: string) {
	firebaseSendEvent('cta_clicked', {label})
}

export const Analytics = {
	trackPageView,
	trackDomainChecked,
	trackInvalidDomain,
	trackLegalSite,
	trackSuspectSite,
	trackCTA
}
