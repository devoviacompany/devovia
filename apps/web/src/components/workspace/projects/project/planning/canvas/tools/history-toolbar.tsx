import { Redo2, Undo2 } from 'lucide-react';

export default function HistoryPill() {
  return (
    <div className="col-span-1 flex justify-start items-center">
      <div className="inline-flex items-center h-[60px] rounded-xl shadow backdrop-blur bg-background/80 border p-2">
        <span className="inline-grid h-9 w-9 place-items-center rounded-full hover:bg-foreground/[0.12] transition-all cursor-pointer">
          <Undo2 size={18} className="opacity-80 stroke-[1.75]" />
        </span>
        <span className="mx-1 h-5 w-px rounded bg-foreground/[0.16]" />
        <span className="inline-grid h-9 w-9 place-items-center rounded-full hover:bg-foreground/[0.12] transition-all cursor-pointer">
          <Redo2 size={18} className="opacity-80 stroke-[1.75]" />
        </span>
      </div>
    </div>
  );
};
