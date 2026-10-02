import { transliterate } from "@/lib/google-input/transliterate"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (typeof text !== "string" || !text.trim()) {
      return Response.json({ error: "Text is required" }, { status: 400 })
    }

    const result = await transliterate(text)

    if (
      !Array.isArray(result) ||
      !Array.isArray(result[1]) ||
      !Array.isArray(result[1][0])
    ) {
      throw new Error("Unexpected Google Input Tools response")
    }

    const suggestions = result?.[1]?.[0]?.[1] ?? []

    return Response.json({ suggestions })
  } catch (error) {
    console.error("Transliteration error:", error)

    return Response.json(
      { error: "Failed to transliterate text" },
      { status: 502 }
    )
  }
}
