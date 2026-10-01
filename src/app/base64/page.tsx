"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, ArrowLeftRight, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function encodeBase64(value: string) {
  return atob(value);
}

function decodeBase64(value: string) {
  return btoa(value);
}

export default function Base64() {
  const [operation, setOperation] = useState<"encode" | "decode">("encode");

  function handleCopy() {
    console.log("Not implemented.");
  }

  function handleSwap() {
    console.log("Not implemented.");
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

        <h1 className="font-semibold text-xl">Base64 Encoder/Decoder</h1>
      </div>

      <div className="mt-4 flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Operation
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setOperation("encode")}>
                Encode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOperation("decode")}>
                Decode
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex space-x-2">
          <Button
            onClick={() => handleSwap()}
            variant={"secondary"}
            size={"icon"}
          >
            <ArrowLeftRight />
          </Button>
          <Button
            onClick={() => handleCopy()}
            variant={"secondary"}
            size={"icon"}
          >
            <Copy />
          </Button>
        </div>
      </div>

      <section className="flex flex-col sm:flex-row gap-4 mt-4">
        <Textarea
          spellCheck={false}
          placeholder={`${operation === "encode" ? "Plain text." : "Base64 encoded text."}`}
        />
        <Textarea
          readOnly
          placeholder={`${operation === "encode" ? "Base64 encoded text." : "Plain text."}`}
        />
      </section>
    </div>
  );
}
