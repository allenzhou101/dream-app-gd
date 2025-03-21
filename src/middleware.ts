// /middleware.ts
import { authMiddleware } from '@descope/nextjs-sdk/server'

export default authMiddleware({
	projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID,
	// baseUrl: process.env.NEXT_PUBLIC_DESCOPE_BASE_URL,
    redirectUrl: '/auth',
	publicRoutes: ['/auth'],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}