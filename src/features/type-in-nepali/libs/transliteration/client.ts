export async function transliterate(text: string): Promise<string[]> {
  const response = await fetch("/api/transliterate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
  if (!response.ok) {
    throw new Error("Transliteration failed")
  }

  const result = await response.json()
  return result.suggestions
}
