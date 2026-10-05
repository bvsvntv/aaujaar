import Footer from "@/components/common/footer"
import { buttonVariants } from "@/components/ui/button"
import { Binary, CodeXml, Languages } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    name: "Base64 Encoder/Decoder",
    route: "/base64",
    icon: <Binary data-icon="inline-start" />,
  },
  {
    name: "Romanized Nepali Typing",
    route: "/type-in-nepali",
    icon: <Languages data-icon="inline-start" />,
  },
  {
    name: "Markdown Editor",
    route: "/markdown-editor",
    icon: <CodeXml data-icon="inline-start" />,
  },
]

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        {tools.map((tool) => {
          return (
            <Link
              key={tool.route}
              href={tool.route}
              className={buttonVariants({
                variant: "secondary",
                className: "p-4 sm:p-8 sm:text-lg",
              })}
            >
              {tool.icon}
              {tool.name}
            </Link>
          )
        })}
      </div>

      <Footer />
    </main>
  )
}
