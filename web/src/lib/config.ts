function env(key: string, fallback: string): string {
  return process.env[key] ?? fallback
}

function envNumber(key: string, fallback: number): number {
  const value = process.env[key]
  return value ? parseInt(value, 10) : fallback
}

export const CONFIG = {
  API_URL: env('NEXT_PUBLIC_API_URL', 'http://127.0.0.1:8000'),
  ITEMS_PER_PAGE: envNumber('NEXT_PUBLIC_ITEMS_PER_PAGE', 50),
  MAX_STAGGER_DELAY: 0.5,
  STAGGER_STEP: 0.1,
  FAVORITES_KEY: 'vw-favorites',
  TOAST_DURATION: envNumber('NEXT_PUBLIC_TOAST_DURATION', 3000)
} as const
