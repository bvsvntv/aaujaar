import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TypeInNepali() {
  return (
    <>
      <Link
        href={"/"}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <ArrowLeft />
      </Link>
      <p>Romanized Nepali Typing</p>
    </>
  );
}
