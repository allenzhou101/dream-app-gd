import { Paragraph } from "@tiptap/extension-paragraph";
// import { Typography } from "@tiptap/extension-typography";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
// import { Subscript } from "@tiptap/extension-subscript";
// import { Superscript } from "@tiptap/extension-superscript";
// import { Placeholder } from "@tiptap/extension-placeholder";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Highlight } from "@tiptap/extension-highlight";
import { FontFamily } from "@tiptap/extension-font-family";
// import Focus from "@tiptap/extension-focus";
import { Color } from "@tiptap/extension-color";
// import { CharacterCount } from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";


export const extensions = [
  StarterKit,
  // Typography,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  // Subscript,
  // Superscript,
  // Placeholder.configure({
  //   placeholder: "Start writing...",
  // }),
  Highlight,
  FontFamily,
  // Focus,
  Color,
  // CharacterCount,
];
