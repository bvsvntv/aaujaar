import dotenv from "dotenv"

// Load '.env
dotenv.config({ path: "./.env" })

const baseURL = process.env.GOOGLE_INPUT_TOOLS_URL
const PREFERRED_LANGUAGE_CODE = "ne-t-i0-und" // Nepali language
const PREFERRED_MAX_RESULTS = 5

export async function transliterator(text: string): Promise<string[]> {
  if (!baseURL) {
    throw new Error("GOOGLE_INPUT_TOOLS_URL is not configured.")
  }

  const url =
    `${baseURL}/request` +
    `?text=${encodeURIComponent(text)}` +
    `&itc=${PREFERRED_LANGUAGE_CODE}` +
    `&num=${PREFERRED_MAX_RESULTS}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Google API failed: ${response.status}, ${response.statusText}`
    )
  }

  const serialized = await response.json()
  const suggestions = serialized?.[1]?.[0]?.[1]

  if (!Array.isArray(serialized)) {
    return []
  }

  return suggestions
}
