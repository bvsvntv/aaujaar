"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowLeft, BrushCleaning, Copy } from "lucide-react"
import React, { useRef, useState } from "react"
import { useTransliteration } from "@/hooks/use-transliteration"

export default function TypeInNepali() {
  const [input, setInput] = useState<string>("")

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { suggestions, handleChange } = useTransliteration(setInput)

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    handleChange(event.target.value, event.target.selectionStart)
  }

  console.log("suggestions: ", suggestions)

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

  function handleClear() {
    setInput("")
    toast.success("Everything cleared!")
  }

  return (
    <div className="mt-8 p-2">
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={"/"}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <ArrowLeft />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>home</p>
          </TooltipContent>
        </Tooltip>

        <h1 className="text-xl font-semibold">Romanized Nepali Typing</h1>
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={handleClear} variant="secondary" size="icon">
          <BrushCleaning />
        </Button>

        <Button onClick={handleCopy} variant="secondary" size="icon">
          <Copy />
        </Button>
      </div>

      <section className="mt-4">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          className="h-48 sm:min-h-92"
        />
      </section>
    </div>
  )
}
