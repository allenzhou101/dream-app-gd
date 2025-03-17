// import { Paragraph } from "@tiptap/extension-paragraph";
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
import { Placeholder } from "@tiptap/extension-placeholder";
// import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Highlight } from "@tiptap/extension-highlight";
import { FontFamily } from "@tiptap/extension-font-family";
// import Focus from "@tiptap/extension-focus";
import { Color } from "@tiptap/extension-color";
// import { CharacterCount } from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import ImageResize from "tiptap-extension-resize-image";

import { FontSizeExtensions } from "../extensions/font-size";
import { LineHeightExtension } from "../extensions/line-height";

export const extensions = [
  Placeholder.configure({
    placeholder: "Start writing...",
  }),
  StarterKit.configure({
    history: false,
  }),
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskList,
  Image,
  ImageResize,
  Underline,
  FontFamily,
  TextStyle,
  Color,
  LineHeightExtension.configure({
    types: ["heading", "paragraph"],
    defaultLineHeight: "1.5",
  }),
  FontSizeExtensions,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  Highlight.configure({
    multicolor: true,
  }),
  TaskItem.configure({ nested: true }),
];
