"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import { Room } from "./room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen bg-editor-bg">
        {/* <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
          <Navbar data={document} />
          <Toolbar />
        </div> */}
        <div className="w-[816px] mx-auto flex flex-col pt-2 fixed top-0 left-0 right-0 z-10 print:hidden h-[112px]">
          <Navbar data={document} />
        </div>
        <div className="pt-[154px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};
