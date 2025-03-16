'use client'

import { useCallback, useMemo } from "react";
import { useSession } from "@descope/nextjs-sdk/client";


function useAuthFromDescope() {
    const { isSessionLoading: isLoading, isAuthenticated, sessionToken } = useSession();
    const fetchAccessToken = useCallback(
      async () => {
        // Here you can do whatever transformation to get the ID Token
        // or null
        // Make sure to fetch a new token when `forceRefreshToken` is true
        // return await getToken({ ignoreCache: forceRefreshToken });
        return sessionToken;
      },
      // If `getToken` isn't correctly memoized
      // remove it from this dependency array
      [sessionToken],
    );
    return useMemo(
      () => ({
        // Whether the auth provider is in a loading state
        isLoading: isLoading,
        // Whether the auth provider has the user signed in
        isAuthenticated: isAuthenticated ?? false,
        // The async function to fetch the ID token
        fetchAccessToken,
      }),
      [isLoading, isAuthenticated, fetchAccessToken],
    );
  }

export default useAuthFromDescope