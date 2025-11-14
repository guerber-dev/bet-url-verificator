// firebaseMethods.ts

import {logEvent} from 'firebase/analytics'
import {analytics} from './firebase'

/**
 * Envia um evento cru diretamente para o Firebase.
 * NÃO contém regras de negócio, apenas abstrai o SDK.
 */
export function firebaseSendEvent(
	eventName: string,
	params?: Record<string, any>
) {
	if (!analytics) return

	try {
		logEvent(analytics, eventName, params)
	} catch (error) {
		console.warn('Firebase analytics error:', error)
	}
}
