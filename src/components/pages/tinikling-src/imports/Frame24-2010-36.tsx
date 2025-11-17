import svgPaths from "./svg-90r18klix5";

export default function Frame24() {
  return (
    <div className="relative size-full rounded-[10px] bg-[rgba(255,255,255,0.1)]">
      <div className="relative flex size-full flex-row items-center">
        <div className="relative box-border flex size-full content-stretch items-center justify-start gap-2.5 overflow-clip px-[30px] py-2.5">
          <div className="relative h-[18.921px] w-6 shrink-0" data-name="Vector">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 19"
            >
              <path d={svgPaths.p1d146f00} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
          <div className="relative shrink-0 text-nowrap font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-white">
            <p className="whitespace-pre leading-[normal]">Join our discord server</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-white"
      />
    </div>
  );
}
