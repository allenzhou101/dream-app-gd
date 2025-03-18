"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SavingStatusContextType {
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

const SavingStatusContext = createContext<SavingStatusContextType | undefined>(
  undefined
);

export function SavingStatusProvider({ children }: { children: ReactNode }) {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <SavingStatusContext.Provider value={{ isSaving, setIsSaving }}>
      {children}
    </SavingStatusContext.Provider>
  );
}

export function useSavingStatus() {
  const context = useContext(SavingStatusContext);
  if (context === undefined) {
    throw new Error(
      "useSavingStatus must be used within a SavingStatusProvider"
    );
  }
  return context;
}
