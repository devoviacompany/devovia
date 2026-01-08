import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef, useState } from "react";
import { MessageLoading } from "./message-loading";

// Local-only fragment and message types for demo UI
type Fragment = {
  id: string
  title?: string
  sandboxUrl?: string
  files?: { [path: string]: string }
}

type Message = {
  id: string
  content: string
  role: "USER" | "ASSISTANT"
  fragment: Fragment | null
  createdAt: Date
  type: "RESULT" | "ERROR" | "USER"
}

interface Props {
  activeFragment: Fragment | null
  setActiveFragment: (fragment: Fragment | null) => void;
}

const DEMO_FRAGMENT: Fragment = {
  id: "demo-fragment",
  title: "Landing page",
  sandboxUrl: "https://example.com",
  files: {
    "public/favicon.ico": "binary data placeholder for favicon.ico",
    "src/app/page.tsx": `"use client"\n\nimport Header from "@/components/Header"\nimport Hero from "@/components/Hero"\nimport Features from "@/components/Features"\nimport CTA from "@/components/CTA"\nimport Footer from "@/components/Footer"\n\nexport default function Page() {\n  return (\n    <div className=\"min-h-screen flex flex-col bg-background text-foreground\">\n      <Header />\n      <main className=\"flex-1\">\n        <Hero />\n        <Features />\n        <CTA />\n      </main>\n      <Footer />\n    </div>\n  )\n}\n`,
    "src/app/layout.tsx": `import type { ReactNode } from "react"\nimport "@/style/globals.css"\n\nexport default function RootLayout({ children }: { children: ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body className=\"min-h-screen bg-background text-foreground antialiased\">\n        {children}\n      </body>\n    </html>\n  )\n}\n`,
    "src/components/Header.tsx": `export default function Header() {\n  return (\n    <header className=\"border-b bg-muted/40\">\n      <div className=\"mx-auto flex h-12 max-w-6xl items-center justify-between px-4 text-sm\">\n        <span className=\"font-semibold\">Devovia Demo</span>\n        <nav className=\"flex items-center gap-4 text-muted-foreground\">\n          <button className=\"hover:text-foreground\">Docs</button>\n          <button className=\"hover:text-foreground\">Pricing</button>\n          <button className=\"hover:text-foreground\">Changelog</button>\n        </nav>\n      </div>\n    </header>\n  )\n}\n`,
    "src/components/Footer.tsx": `export default function Footer() {\n  return (\n    <footer className=\"border-t bg-muted/40\">\n      <div className=\"mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground\">\n        <span> 2023 Devovia. All rights reserved.</span>\n        <div className=\"flex items-center gap-3\">\n          <span>Terms</span>\n          <span>Privacy</span>\n        </div>\n      </div>\n    </footer>\n  )\n}\n`,
    "src/components/Hero.tsx": `export default function Hero() {\n  return (\n    <section className=\"border-b bg-gradient-to-b from-background to-muted/40\">\n      <div className=\"mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center\">\n        <div className=\"flex-1 space-y-4\">\n          <p className=\"text-xs uppercase tracking-wide text-primary\">Demo project</p>\n          <h1 className=\"text-3xl font-semibold md:text-4xl\">\n            Ship internal tools with an AI pair programmer.\n          </h1>\n          <p className=\"text-sm text-muted-foreground max-w-md\">\n            This is a static demo fragment used to populate the code tab.\n            Replace it with your own files when you connect a real project.\n          </p>\n        </div>\n        <div className=\"flex-1 rounded-md border bg-card p-4 text-xs text-muted-foreground\">\n          <p>// Fake metrics</p>\n          <p>requests_last_minute: 128</p>\n          <p>error_rate: 0.2%</p>\n          <p>deployment: \"2026-01-08T16:59:17Z\"</p>\n        </div>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/Features.tsx": `export default function Features() {\n  const features = [\n    \"Backend health dashboards\",\n    \"Convex-style logs and database viewers\",\n    \"Inline code editor with fake terminal\",\n    \"Sample fragments wired into the UI\",\n  ]\n\n  return (\n    <section className=\"border-b bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8\">\n        <h2 className=\"mb-4 text-base font-semibold\">Features</h2>\n        <ul className=\"grid gap-3 text-sm md:grid-cols-2\">\n          {features.map((feature) => (\n            <li key={feature} className=\"rounded-md border bg-card px-3 py-2\">\n              {feature}\n            </li>\n          ))}\n        </ul>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/CTA.tsx": `export default function CTA() {\n  return (\n    <section className=\"bg-muted/60\">\n      <div className=\"mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between\">\n        <div>\n          <h2 className=\"text-base font-semibold\">Ready to build?</h2>\n          <p className=\"text-sm text-muted-foreground\">Connect your repo and let Devovia scaffold the rest.</p>\n        </div>\n        <button className=\"rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground\">\n          Open dashboard\n        </button>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/Testimonials.tsx": `export default function Testimonials() {\n  const items = [\n    { name: \"Ada\", quote: \"I shipped an internal tool in a weekend.\" },\n    { name: \"Bruno\", quote: \"The fake metrics are oddly satisfying.\" },\n  ]\n\n  return (\n    <section className=\"border-t bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8\">\n        <h2 className=\"mb-4 text-base font-semibold\">Testimonials</h2>\n        <div className=\"grid gap-3 md:grid-cols-2\">\n          {items.map((item) => (\n            <figure key={item.name} className=\"rounded-md border bg-card p-3 text-sm\">\n              <blockquote className=\"text-muted-foreground\">\"{item.quote}\"</blockquote>\n              <figcaption className=\"mt-2 text-xs text-muted-foreground\">\n                — {item.name}\n              </figcaption>\n            </figure>\n          ))}\n        </div>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/Contact.tsx": `export default function Contact() {\n  return (\n    <section className=\"border-t bg-muted/40\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8 text-sm\">\n        <h2 className=\"mb-3 text-base font-semibold\">Contact</h2>\n        <p className=\"mb-2 text-muted-foreground\">\n          This is demo content only. In a real project, connect your contact form\n          to your backend or a provider like Resend.\n        </p>\n        <p className=\"text-muted-foreground\">Email: support@example.com</p>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/FAQ.tsx": `export default function FAQ() {\n  const faqs = [\n    { q: \"Is this connected to a real backend?\", a: \"No, this is a static demo.\" },\n    { q: \"Can I customize it?\", a: \"Yes, replace the DEMO_FRAGMENT with your own files.\" },\n  ]\n\n  return (\n    <section className=\"border-t bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8 text-sm\">\n        <h2 className=\"mb-3 text-base font-semibold\">FAQ</h2>\n        <dl className=\"space-y-3\">\n          {faqs.map((item) => (\n            <div key={item.q} className=\"rounded-md border bg-card p-3\">\n              <dt className=\"font-medium\">{item.q}</dt>\n              <dd className=\"text-muted-foreground\">{item.a}</dd>\n            </div>\n          ))}\n        </dl>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/AboutUs.tsx": `export default function AboutUs() {\n  return (\n    <section className=\"border-t bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8 text-sm\">\n        <h2 className=\"mb-3 text-base font-semibold\">About this demo</h2>\n        <p className=\"text-muted-foreground\">\n          The goal of this fragment is to provide enough code to make the editor\n          and terminal feel real while still being entirely local and safe.\n          You can replace this with any structure your app needs.\n        </p>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/test.tsx": `export default function Test() {\n  return (\n    <section className=\"border-t bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8 text-sm\">\n        <h2 className=\"mb-3 text-base font-semibold\">About this demo</h2>\n        <p className=\"text-muted-foreground\">\n          The goal of this fragment is to provide enough code to make the editor\n          and terminal feel real while still being entirely local and safe.\n          You can replace this with any structure your app needs.\n        </p>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/test2.tsx": `export default function Test2() {\n  return (\n    <section className=\"border-t bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8 text-sm\">\n        <h2 className=\"mb-3 text-base font-semibold\">About this demo</h2>\n        <p className=\"text-muted-foreground\">\n          The goal of this fragment is to provide enough code to make the editor\n          and terminal feel real while still being entirely local and safe.\n          You can replace this with any structure your app needs.\n        </p>\n      </div>\n    </section>\n  )\n}\n`,
    "src/components/test3.tsx": `export default function Test3() {\n  return (\n    <section className=\"border-t bg-background\">\n      <div className=\"mx-auto max-w-6xl px-4 py-8 text-sm\">\n        <h2 className=\"mb-3 text-base font-semibold\">About this demo</h2>\n        <p className=\"text-muted-foreground\">\n          The goal of this fragment is to provide enough code to make the editor\n          and terminal feel real while still being entirely local and safe.\n          You can replace this with any structure your app needs.\n        </p>\n      </div>\n    </section>\n  )\n}\n`,
    // "package.json": "{}",
  },
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "USER",
    content: "Build a modern SaaS landing page.",
    fragment: null,
    createdAt: new Date(),
    type: "USER",
  },
  {
    id: "m2",
    role: "ASSISTANT",
    content: "Here is a first version of your landing page and its code.",
    fragment: DEMO_FRAGMENT,
    createdAt: new Date(),
    type: "RESULT",
  },
]

export const MessagesContainer = ({
  activeFragment,
  setActiveFragment,
}: Props) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastAssistantMessageIdRef = useRef<string | null>(null)

  useEffect(() => {
    const lastAssistantMessage = [...messages].reverse().find(
      (message) => message.role === "ASSISTANT",
    )
    if (
      lastAssistantMessage?.fragment &&
      lastAssistantMessageIdRef.current !== lastAssistantMessage.id
    ) {
      setActiveFragment(lastAssistantMessage.fragment)
      lastAssistantMessageIdRef.current = lastAssistantMessage.id
    }
  }, [messages, setActiveFragment])

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [messages.length])

  const lastMessage = messages[messages.length - 1]
  const isLastMessageUser = lastMessage?.role === "USER"

  const handleSendMessage = (value: string) => {
    const now = new Date()
    const userMessage: Message = {
      id: `u-${now.getTime()}`,
      role: "USER",
      content: value,
      fragment: null,
      createdAt: now,
      type: "USER",
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate assistant response with same demo fragment
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        role: "ASSISTANT",
        content: "Here is an updated version based on your latest request.",
        fragment: DEMO_FRAGMENT,
        createdAt: new Date(),
        type: "RESULT",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const fakeUsage = { points: 42, msBeforeNext: 1000 * 60 * 60 * 24 }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              onFragmentClick={() => {
                if (message.fragment) {
                  setActiveFragment(message.fragment)
                }
              }}
              type={message.type}
            />
          ))}
          {isLastMessageUser && <MessageLoading />}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6  bg-gradient-to-b from-transparent to-background/70 pointer-events-none" />
        <MessageForm onSubmit={handleSendMessage} usage={fakeUsage} />
      </div>
    </div>
  )
}