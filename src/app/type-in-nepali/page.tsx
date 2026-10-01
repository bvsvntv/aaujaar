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

export default function TypeInNepali() {
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
      </div>

      <section className="mt-4">
        <Textarea className="h-48 sm:min-h-92" />
      </section>
    </div>
  )
}
