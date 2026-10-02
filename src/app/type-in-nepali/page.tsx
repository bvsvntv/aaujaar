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
import { ArrowLeft, BrushCleaning, Copy, Play } from "lucide-react"

export default function TypeInNepali() {
  async function handleTransliteration() {
    const response = await fetch("/api/transliterate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "basanta" }),
    })
    if (!response.ok) {
      throw new Error("Transliteration failed")
    }

    const result = await response.json()
    console.log(result)
  }

  function handleCopy() {
    toast.error("Not implemented!")
  }

  function handleClear() {
    toast.error("Not implemented!")
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

        <Button onClick={handleTransliteration} variant="secondary" size="icon">
          <Play />
        </Button>
      </div>

      <section className="mt-4">
        <Textarea className="h-48 sm:min-h-92" />
      </section>
    </div>
  )
}
