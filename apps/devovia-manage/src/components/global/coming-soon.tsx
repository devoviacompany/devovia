export default function ComingSoon({ pageName }: { pageName: string }) {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center overflow-hidden relative bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle at 10px 10px, rgba(120,120,120,0.3) 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }}
    >
      <h1 className="text-4xl font-bold leading-tight">Coming Soon 👀</h1>
      <p className="text-center text-muted-foreground">
        This {pageName} Dashboard page has not been created yet. <br />
        Stay tuned though!
      </p>
    </div>
  )
}
