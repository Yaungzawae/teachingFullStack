export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const websiteUrl = isProduction ? process.env.WEBSITE_URL : "http://localhost:8080"