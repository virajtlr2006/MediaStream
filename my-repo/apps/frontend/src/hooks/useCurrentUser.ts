// hooks/useCurrentUser.ts

import { useUser } from '@clerk/react'

// Hook: useCurrentUser — centralizes Clerk user info for the app
// Returns: { username, fullName, imageUrl, email, isLoaded }

export interface User {
  username: string | null
  fullName: string | null
  imageUrl: string | null
  email: string | null
  isLoaded: boolean
}

export const useCurrentUser = (): User => {
  // Clerk: get user object and loading state
  const { user, isLoaded } = useUser()

  return {
    username: user?.username ?? null,
    fullName: user?.fullName ?? null,
    imageUrl: user?.imageUrl ?? null,
    email: user?.primaryEmailAddress?.emailAddress ?? null,
    isLoaded
  }
}