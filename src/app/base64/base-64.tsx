"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldError } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftRight, BrushCleaning, Copy } from "lucide-react"
import SectionHeader from "@/components/common/section-header"

type Operation = "encode" | "decode"

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value)

  let binary = ""

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return btoa(binary)
}

function decodeBase64(value: string) {
  const binary = atob(value)

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

function transform(value: string, operation: Operation) {
  switch (operation) {
    case "encode":
      return encodeBase64(value)
    case "decode":
      return decodeBase64(value)
  }
}

export default function Base64() {
  const [operation, setOperation] = useState<Operation>("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  function handleInputChange(value: string) {
    setInput(value)
    setError("")

    if (!value) {
      setOutput("")
      return
    }

    try {
      const result = transform(value, operation)
      setOutput(result)
    } catch {
      setOutput("")
      setError("Invalid Base64 input.")
    }
  }

  function handleOperationChange(newOperation: Operation) {
    setOperation(newOperation)
    setError("")

    if (!input) {
      setOutput("")
      return
    }

    try {
      const result = transform(input, newOperation)
      setOutput(result)
    } catch {
      setOutput("")
      setError("Invalid Base64 input.")
      toast.error("Invalid Base64 input")
    }
  }

  function handleSwap() {
    setInput(output)
    setOutput(input)
    setError("")

    setOperation((current) => (current === "encode" ? "decode" : "encode"))

    toast.success("Values swapped!")
  }

  async function handleCopy() {
    if (!output) {
      toast.warning("Nothing to copy!")
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      toast.success("Copied to clipboard!")
    } catch {
      toast.error("Failed to copy!")
    }
  }

  function handleClear() {
    setInput("")
    setOutput("")
    setError("")

    toast.success("Cleared!")
  }

  return (
    <div className="mt-8 p-2">
      <SectionHeader
        header="Base64 Encoder/Decoder"
        description="Quickly encode text to Base64 or decode Base64 strings back to plain text."
      />

      <div className="mt-4 flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            {operation === "encode" ? "Encode" : "Decode"}
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleOperationChange("encode")}>
                Encode
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleOperationChange("decode")}>
                Decode
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex space-x-2">
          <Button onClick={handleClear} variant="secondary" size="icon">
            <BrushCleaning />
          </Button>

          <Button onClick={handleSwap} variant="secondary" size="icon">
            <ArrowLeftRight />
          </Button>

          <Button onClick={handleCopy} variant="secondary" size="icon">
            <Copy />
          </Button>
        </div>
      </div>

      <section className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Field data-invalid={!!error}>
          <Textarea
            className="h-48 sm:min-h-92"
            aria-invalid={!!error}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            spellCheck={false}
            placeholder={
              operation === "encode" ? "Plain text." : "Base64 encoded text."
            }
          />

          {error && <FieldError>{error}</FieldError>}
        </Field>

        <Textarea
          className="h-48 sm:min-h-92"
          value={output}
          readOnly
          placeholder={
            operation === "encode" ? "Base64 encoded text." : "Plain text."
          }
        />
      </section>
    </div>
  )
}
