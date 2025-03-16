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
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* <SignIn routing="hash" /> */}
            unauthorized
            <SignUpOrInFlow />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="Auth loading..." />
        </AuthLoading>
      </ConvexProviderWithAuth>
    </AuthProvider>
  );
}

// function Authenticated({ children }: { children: ReactNode }) {
//   const { isAuthenticated, isLoading } = useStoreUserEffect();
//   if (!isAuthenticated || isLoading) return null;
//   return children;
// }

// function Unauthenticated({ children }: { children: ReactNode }) {
//   const { isAuthenticated, isLoading } = useStoreUserEffect();
//   if (isAuthenticated || isLoading) return null;
//   return children;
// }

// function AuthLoading({ children }: { children: ReactNode }) {
//   const { isLoading } = useStoreUserEffect();
//   if (!isLoading) return null;
//   return children;
// }

// function UseStoreUser({ children }: { children: ReactNode }) {
//   const { isAuthenticated } = useStoreUserEffect();
//   return children;
// }

// export function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return (
//     <ClerkProvider
//       publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
//         <Authenticated>{children}</Authenticated>
//         <Unauthenticated>
//           <div className="flex flex-col items-center justify-center min-h-screen">
//             <SignIn routing="hash" />
//           </div>
//         </Unauthenticated>
//         <AuthLoading>
//           <FullscreenLoader label="Auth loading..." />
//         </AuthLoading>
//       </ConvexProviderWithClerk>
//     </ClerkProvider>
//   );
// }
