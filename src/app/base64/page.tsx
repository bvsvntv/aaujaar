import { Metadata } from "next"
import Base64 from "./base-64"

export const metadata: Metadata = {
  title: "Base64 Enoder/Decoder",
  description:
    "Quickly encode text to Base64 or decode Base64 strings back to plain text.",
}

export default function Page() {
  return <Base64 />
}
