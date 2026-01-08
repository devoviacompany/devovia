import { useEffect } from "react"
import Prism from "prismjs"

// Load Prism core languages commonly used in the preview
import "prismjs/components/prism-markup" // html
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-json"
import "prismjs/components/prism-css"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-yaml"
import "@/style/admin/code-theme.css"

interface Props {
  code: string;
  lang: string;
}
export const CodeView = ({
  code,
  lang
}: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code])
  return (
    <div className="h-full w-full overflow-auto rounded-md border bg-muted">
      <pre
        className="m-0 px-4 py-3 text-xs leading-relaxed bg-transparent border-none"
      >
        <code className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
