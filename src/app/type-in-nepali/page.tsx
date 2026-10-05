import { Metadata } from "next"
import TypeInNepali from "./type-in-nepali"

export const metadata: Metadata = {
  title: "Romanized Nepali Typing",
  description: "Type in Nepali using Romanized English input.",
}

export default function Page() {
  return <TypeInNepali />
}
