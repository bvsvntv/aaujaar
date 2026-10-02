"use client"

import React, { useEffect, useRef, useState } from "react"
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
import { useTransliteration } from "@/features/type-in-nepali/hooks/use-transliteration"
import { NepaliSuggestions } from "@/features/type-in-nepali/components/suggestions"

type CursorCoords = {
  top: number
  left: number
}

function getCursorCoords(textarea: HTMLTextAreaElement) {
  const div = document.createElement("div")
  const style = window.getComputedStyle(textarea)

  div.style.position = "fixed"
  div.style.visibility = "hidden"
  div.style.whiteSpace = "pre-wrap"
  div.style.overflowWrap = "break-word"

  div.style.top = `${textarea.getBoundingClientRect().top}px`
  div.style.left = `${textarea.getBoundingClientRect().left}px`
  div.style.width = `${textarea.clientWidth}px`

  div.style.font = style.font
  div.style.lineHeight = style.lineHeight
  div.style.padding = style.padding
  div.style.border = style.border
  div.style.boxSizing = "border-box"

  const textBeforeCursor = textarea.value.slice(0, textarea.selectionStart)

  div.textContent = textBeforeCursor

  const marker = document.createElement("span")
  marker.textContent = "\u200b"
  div.appendChild(marker)

  document.body.appendChild(div)

  const rect = marker.getBoundingClientRect()

  document.body.removeChild(div)

  return {
    top: rect.top,
    left: rect.left,
  }
}

export default function TypeInNepali() {
  const [input, setInput] = useState<string>("")
  const [suggestionCoords, setSuggestionCoords] = useState<CursorCoords | null>(
    null
  )

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    suggestions,
    activeWord,
    cursorRestorePosition,
    handleCursorRestored,
    handleChange,
    handleSelectSuggestion,
  } = useTransliteration(setInput)

  // suggestions coordinate calculation
  useEffect(() => {
    if (suggestions.length === 0 || !activeWord || !textareaRef.current) {
      setSuggestionCoords(null)
      return
    }

    setSuggestionCoords(getCursorCoords(textareaRef.current))
  }, [suggestions, activeWord, input])

  // Cursor restoration
  useEffect(() => {
    if (cursorRestorePosition === null || !textareaRef.current) {
      return
    }

    textareaRef.current.focus()

    textareaRef.current.setSelectionRange(
      cursorRestorePosition,
      cursorRestorePosition
    )

    handleCursorRestored()
  }, [input, cursorRestorePosition, handleCursorRestored])

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    handleChange(event.target.value, event.target.selectionStart)

    if (textareaRef.current) {
      const coords = getCursorCoords(textareaRef.current)
      setSuggestionCoords(coords)
    }
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

      {suggestionCoords && suggestions.length > 0 && (
        <div
          className="fixed z-50"
          style={{
            top: suggestionCoords.top,
            left: suggestionCoords.left,
          }}
        >
          <NepaliSuggestions
            suggestions={suggestions}
            onSelect={(suggestion) => {
              handleSelectSuggestion(suggestion, input)
            }}
          />
        </div>
      )}
    </div>
  )
}
