export const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
  APP_NAME: 'BetterUptime',
  APP_DESCRIPTION: 'Website Monitoring & Uptime Monitoring',
} as const; 