'use client';

import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

export default function ZoomToolbar() {

  const handleZoomOut = () => {
    // FIX: Use Math.max with minScale, not division
  };

  const handleZoomIn = () => {
    // FIX: Use Math.min with maxScale, not Math.max
  };

  const handleResetZoom = () => {
  };

  // Format zoom percentage
  const zoomPercentage = Math.round(1 * 100);

  return (
    <div className="col-span-1 flex justify-end items-center">
      <div className="inline-flex items-center rounded-xl shadow backdrop-blur bg-background/80 border p-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleZoomOut}
          // disabled={isAtMinZoom}
          className="w-9 h-9 p-0 rounded-full cursor-pointer hover:bg-foreground/[0.12] border border-transparent hover:border-foreground/[0.16] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>

        <button
          onClick={handleResetZoom}
          className="min-w-[60px] text-center px-2 py-1 rounded-md hover:bg-foreground/[0.08] transition-colors cursor-pointer"
          title="Reset to 100%"
          aria-label={`Current zoom: ${zoomPercentage}%. Click to reset.`}
        >
          <span className="text-sm font-mono leading-none select-none">
            {zoomPercentage}%
          </span>
        </button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomIn}
          // disabled={isAtMaxZoom}
          className="w-9 h-9 p-0 rounded-full cursor-pointer hover:bg-foreground/[0.12] border border-transparent hover:border-foreground/[0.16] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
