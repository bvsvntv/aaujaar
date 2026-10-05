import { Metadata } from "next"
import MarkdownEditor from "./markdown-editor"

export const metadata: Metadata = {
  title: "Markdown Editor",
  description: "Edit & Preview Markdown.",
}

export default function Page() {
  return <MarkdownEditor />
}
