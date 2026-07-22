import React, { useState } from "react";
import { trackEvent } from "../../content/site";

interface Props {
  title: string;
  context: string;
  meta?: string;
  beforeGrad?: string;
  afterGrad?: string;
}

// Accessible before/after reveal slider (range input drives a clip-path).
export const BeforeAfter: React.FC<Props> = ({
  title, context, meta,
  beforeGrad = "linear-gradient(135deg,#E0E4E8,#CDD4DB)",
  afterGrad = "linear-gradient(135deg,#DCEBE7,#C3E2DA)",
}) => {
  const [pos, setPos] = useState(50);
  return (
    <div className="bg-white border border-neutral-soft rounded-[22px] overflow-hidden shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden select-none">
        {/* after (revealed) */}
        <div className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-teal-deep/50 text-center px-4" style={{ background: afterGrad }}>
          <span>Consented patient case image<br />to be added</span>
          <span className="absolute top-3 right-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full bg-turq-600/85">After</span>
        </div>
        {/* before (clipped) */}
        <div className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-ink2/45 text-center px-4 grayscale-[0.4]" style={{ background: beforeGrad, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <span className="absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full bg-navy-deep/70">Before</span>
        </div>
        {/* handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.25)] pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white grid place-items-center text-teal-deep shadow-md text-sm">⟺</span>
        </div>
        <input
          type="range" min={0} max={100} value={pos} aria-label={`Reveal before and after for ${title}`}
          onChange={(e) => { setPos(+e.target.value); }}
          onMouseUp={() => trackEvent("before_after_interact", title)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-[17px] text-teal-deep mb-1.5">{title}</h3>
        <p className="text-sm text-muted2 mb-2">{context}</p>
        {meta && <p className="text-xs text-muted2/80 italic">{meta}</p>}
      </div>
    </div>
  );
};
