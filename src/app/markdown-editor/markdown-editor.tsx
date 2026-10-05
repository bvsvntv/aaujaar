"use client"

import SectionHeader from "@/components/common/section-header"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function MarkdownEditor() {
  const [input, setInput] = useState<string>("")

  return (
    <div className="mt-8 p-2">
      <SectionHeader header="Markdown Editor" />

      <section className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          className="h-48 sm:min-h-92"
          spellCheck={false}
        />

        <div className="flex-1 rounded-lg border px-2.5 py-2 dark:prose-invert">
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>
          </div>
        </div>
      </section>
    </div>
  )
}
