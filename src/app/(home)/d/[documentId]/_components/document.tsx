"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { api } from "../../../../../../convex/_generated/api";
interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <div className="min-h-screen flex-grow">
      <div className="w-full mx-auto flex flex-col fixed top-0 z-10 print:hidden h-[112px]">
        <Navbar data={document} />
      </div>
      <div className="pt-[120px] print:pt-0">
        <Editor documentId={document._id} />
      </div>
    </div>
  );
};
