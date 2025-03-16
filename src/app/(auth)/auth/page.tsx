// components/Auth.tsx

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Auth() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  return (
    <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] h-full flex items-center justify-center">
      <div
        className={
          "px-4 md:px-8 py-6 flex flex-col items-center rounded-md max-w-md w-full " +
          "min-h-[280px] border border-gray-200 "
        }
      >
        {!isReady && (
          <>
            <div className="w-full space-y-3">
              <Skeleton className="mx-auto h-[55px] max-w-[300px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-[55px] w-full rounded-xl" />
                <Skeleton className="h-[55px] w-full rounded-xl" />
                <Skeleton className="h-[55px] w-full rounded-xl" />
              </div>
            </div>
          </>
        )}
        <Descope
          flowId="sign-up-or-in"
          onReady={() => {
            console.log("Descope is ready");
            setIsReady(true);
          }}
          onSuccess={(e: any) => {
            router.push("/");
          }}
          onError={(e: any) => console.log("Could not log in!", e)}
          // redirectAfterSuccess="/"
          // redirectAfterError="/error-page"
        />
      </div>
    </div>
  );
}

export default Auth;
