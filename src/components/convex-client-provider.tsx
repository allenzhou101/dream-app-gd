"use client";

import { ReactNode } from "react";
import { FullscreenLoader } from "./fullscreen-loader";
import { AuthProvider, SignUpOrInFlow } from "@descope/nextjs-sdk";

import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
  ConvexProviderWithAuth,
} from "convex/react";
import useAuthFromDescope from "@/hooks/use-auth-from-descope";
import { useStoreUserEffect } from "@/hooks/use-store-user-effect";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID) {
    throw new Error("NEXT_PUBLIC_DESCOPE_PROJECT_ID is not set");
  }
  return (
    <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID}>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromDescope}>
        <UseStoreUser>
          <Authenticated>{children}</Authenticated>
          <Unauthenticated>
            <div className="flex flex-col items-center justify-center min-h-screen">
              <SignUpOrInFlow />
            </div>
          </Unauthenticated>
          <AuthLoading>
            <FullscreenLoader label="Auth loading..." />
          </AuthLoading>
        </UseStoreUser>
      </ConvexProviderWithAuth>
    </AuthProvider>
  );
}

function UseStoreUser({ children }: { children: ReactNode }) {
  const {} = useStoreUserEffect();
  return children;
}
