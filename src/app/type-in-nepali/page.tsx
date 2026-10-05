import { Metadata } from "next"
import TypeInNepali from "./type-in-nepali"

export const metadata: Metadata = {
  title: "Romanized Nepali Typing",
  description: "Type Nepali easily using Romanized English input.",
}

export default function Page() {
  return <TypeInNepali />
}
