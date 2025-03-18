import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
  isSaving: false,
  setIsSaving: (isSaving) => set({ isSaving }),
}));
