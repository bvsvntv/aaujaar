import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TypeInNepali() {
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

        <h1 className="font-semibold text-xl">Romanized Nepali Typing</h1>
      </div>
    </div>
  );
}
