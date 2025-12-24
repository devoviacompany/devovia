import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface ContentSectionProps {
  title: string
  desc: string
  children: React.JSX.Element
}

export default function ProjectsContentSection({
  title,
  desc,
  children,
}: ContentSectionProps) {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex-none'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='text-muted-foreground'>{desc}</p>
      </div>
      <Separator className='my-4 flex-none' />
      <ScrollArea>
        {children}
      </ScrollArea>
    </div>
  )
}
