/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import {z} from 'zod'

const envSchema = z.object({
	VITE_FIREBASE_API_KEY: z.string(),
	VITE_FIREBASE_AUTH_DOMAIN: z.string(),
	VITE_FIREBASE_PROJECT_ID: z.string(),
	VITE_FIREBASE_STORAGE_BUCKET: z.string(),
	VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
	VITE_FIREBASE_APP_ID: z.string(),
	VITE_FIREBASE_MEASUREMENT_ID: z.string()
})

const _env = envSchema.safeParse({
	VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env
		.VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
	VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
})

if (_env.success === false) {
	console.error('Invalid environment variables', _env.error.format())

	throw new Error('Invalid environment variables.')
}

export const env = _env.data
