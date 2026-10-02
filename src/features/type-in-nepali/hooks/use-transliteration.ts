"use client"

import { useState, useRef, useCallback } from "react"
import { nepaliPunctuation } from "../constants"
import { getWordAtCursor } from "../libs/utils"
import { transliterate } from "../libs/transliteration/client"

export function useTransliteration(setInput: (value: string) => void) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeWord, setActiveWord] = useState<string | null>(null)
  const [wordRange, setWordRange] = useState<{
    start: number
    end: number
  } | null>(null)
  const [cursorRestorePosition, setCursorRestorePosition] = useState<
    number | null
  >(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortController = useRef<AbortController | null>(null)

  const handleCursorRestored = useCallback(() => {
    setCursorRestorePosition(null)
  }, [])

  function clearSuggestions() {
    setSuggestions([])
    setActiveWord(null)
    setWordRange(null)
  }

  async function handleChange(value: string, cursorPos: number) {
    setInput(value)

    // Handle punctuation
    const typedCharacter = value[cursorPos - 1]
    if (typedCharacter in nepaliPunctuation) {
      const replacement = nepaliPunctuation[typedCharacter]

      const rebuilt =
        value.slice(0, cursorPos - 1) + replacement + value.slice(cursorPos)

      setInput(rebuilt)
      setCursorRestorePosition(cursorPos)

      clearSuggestions()
      return
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    const justTypedSpace = value[cursorPos - 1] === " "
    const probePos = justTypedSpace ? cursorPos - 1 : cursorPos
    const atCursor = getWordAtCursor(value, probePos)

    if (justTypedSpace && atCursor) {
      try {
        const results = await transliterate(atCursor.word)
        if (results.length > 0) {
          const rebuilt =
            value.slice(0, atCursor.start) +
            results[0] +
            value.slice(atCursor.end)
          setInput(rebuilt)
          setCursorRestorePosition(atCursor.start + results[0].length)
        }
      } catch (err) {
        console.error("ERROR: ", err)
      }
      clearSuggestions()
      return
    }

    if (atCursor && atCursor.word.length >= 1) {
      setActiveWord(atCursor.word)
      setWordRange({ start: atCursor.start, end: atCursor.end })
      const word = atCursor.word
      debounceTimer.current = setTimeout(async () => {
        // Cancel the previous request
        abortController.current?.abort()

        // Create controller for this request
        const controller = new AbortController()
        abortController.current = controller

        try {
          const results = await transliterate(word, controller.signal)
          setSuggestions(results)
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return
          }
          setSuggestions([])
        }
      }, 150)
    } else {
      clearSuggestions()
    }
  }

  function handleSelectSuggestion(suggestion: string, input: string) {
    if (!wordRange) return

    const { start, end } = wordRange

    const rebuilt = input.slice(0, start) + suggestion + input.slice(end)
    setInput(rebuilt)

    setCursorRestorePosition(start + suggestion.length)

    clearSuggestions()
  }

  return {
    suggestions,
    activeWord,
    cursorRestorePosition,
    handleCursorRestored,
    handleChange,
    handleSelectSuggestion,
  }
}
