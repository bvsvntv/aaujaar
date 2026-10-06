import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Undo2 } from "lucide-react"
import { buttonVariants } from "../ui/button"

type SectionHeaderProps = {
  header: string
  description?: string
}

export default function SectionHeader({
  header,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-2">
      <Tooltip>
        <TooltipTrigger>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "icon",
            })}
          >
            <Undo2 />
          </Link>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p>Home</p>
        </TooltipContent>
      </Tooltip>

      <div>
        <h1 className="text-xl font-semibold">{header}</h1>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
