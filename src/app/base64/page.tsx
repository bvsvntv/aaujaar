import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Base64() {
  return (
    <>
      <Link
        href={"/"}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <ArrowLeft />
      </Link>
      <p>Base64 Encoder/Decoder</p>
    </>
  );
}
