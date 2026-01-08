import Image from "next/image"

interface Props {
  projectName: string
}

export const ProjectHeader = ({ projectName }: Props) => {
  return (
    <header className="p-2 flex justify-between items-center border-b">
      <div
        className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2! flex items-center gap-x-2 h-8 p-0"
      >
        <Image src="/icons/logo.png" alt="Devovia" width={18} height={18} />
        <span className="text-sm font-medium">{projectName}</span>
      </div>
    </header>
  )
}