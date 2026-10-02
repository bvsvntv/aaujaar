"use client"

type NepaliSuggestionsProps = {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export function NepaliSuggestions({
  suggestions,
  onSelect,
}: NepaliSuggestionsProps) {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="w-40 rounded-md border bg-popover p-0.5 text-popover-foreground shadow-xs">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onMouseDown={(event) => {
            event.preventDefault()
            onSelect(suggestion)
          }}
          className="w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
