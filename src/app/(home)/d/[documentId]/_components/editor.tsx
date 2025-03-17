"use client";

import { useEditor, AnyExtension, EditorContent } from "@tiptap/react";
import { useEditorStore } from "@/store/use-editor-store";
import { Ruler } from "./ruler";
import { Threads } from "./threads";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { useTiptapSync } from "@convex-dev/prosemirror-sync/tiptap";
import { api } from "../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../../../convex/_generated/dataModel";

import { extensions } from "@/lib/extensions";

interface EditorProps {
  initialContent?: string | undefined;
  documentId: Id<"documents">;
}

function EditorBody({
  sync,
  documentId,
}: {
  sync: ReturnType<typeof useTiptapSync>;
  documentId: Id<"documents">;
}) {
  const document = useQuery(api.documents.getById, { id: documentId });
  const leftMargin = document?.leftMargin ?? LEFT_MARGIN_DEFAULT;
  const rightMargin = document?.rightMargin ?? RIGHT_MARGIN_DEFAULT;
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    content: sync.initialContent,
    immediatelyRender: true,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          "focus:outline-none print:boder-0 border bg-white border-editor-border flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [sync.extension as AnyExtension, ...extensions],
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="size-full overflow-x-auto bg-editor-bg px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler documentId={documentId} />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
}

export function Editor({ documentId }: EditorProps) {
  const sync = useTiptapSync(api.prosemirror, documentId);

  if (sync.isLoading) {
    return null;
  }

  return <EditorBody sync={sync} documentId={documentId} />;
}
