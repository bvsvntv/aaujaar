import { transliterator } from "@/lib/google-input/transliterator"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (typeof text !== "string" || !text.trim()) {
      return Response.json({ error: "Text is required" }, { status: 400 })
    }

    const suggestions = await transliterator(text)

    return Response.json({ suggestions })
  } catch (error) {
    console.error("Transliteration error:", error)

    return Response.json(
      { error: "Failed to transliterate text" },
      { status: 502 }
    )
  }
}
