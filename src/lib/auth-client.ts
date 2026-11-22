import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { auth } from "./auth";
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        plugins: [inferAdditionalFields<typeof auth>()],
    
})

export const { signIn, signUp, useSession } = createAuthClient()