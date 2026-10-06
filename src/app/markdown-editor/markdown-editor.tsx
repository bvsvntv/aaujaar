"use client"

import SectionHeader from "@/components/common/section-header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BrushCleaning, Copy } from "lucide-react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { toast } from "sonner"

export default function MarkdownEditor() {
  const [input, setInput] = useState<string>("")

  function handleClear() {
    setInput("")
    toast.success("Everything cleared!")
  }

  async function handleCopy() {
    if (!input) {
      toast.warning("Nothing to copy!")
      return
    }

    try {
      await navigator.clipboard.writeText(input)
      toast.success("Copied to clipboard!")
    } catch {
      toast.error("Failed to copy!")
    }
  }

  return (
    <div className="mt-8 p-2">
      <SectionHeader
        header="Markdown Editor"
        description="Edit & Preview Markdown."
      />

      <div className="flex justify-end space-x-2">
        <Button onClick={handleClear} variant="secondary" size="icon">
          <BrushCleaning />
        </Button>

        <Button onClick={handleCopy} variant="secondary" size="icon">
          <Copy />
        </Button>
      </div>

      <section className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-48 flex-1 sm:min-h-172"
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
