interface Props {
  children: React.ReactNode
}

export default function ProjectsLayout({ children }: Props) {
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
      {/* here to remove the scroll in each home page of each projects sidebar items */}
      {/* <main className="flex flex-col"> */}
      <div className="flex-1 flex flex-col px-4 pb-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10px 10px, rgba(120,120,120,0.3) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
        >
        {children}
      </div>
    </main>
  )
}
