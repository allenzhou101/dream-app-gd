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

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID!}>
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
