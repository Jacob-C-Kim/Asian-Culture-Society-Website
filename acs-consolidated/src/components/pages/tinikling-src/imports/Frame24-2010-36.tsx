import svgPaths from "./svg-90r18klix5";

export default function Frame24() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[10px] size-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start overflow-clip px-[30px] py-2.5 relative size-full">
          <div className="h-[18.921px] relative shrink-0 w-6" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 19">
              <path d={svgPaths.p1d146f00} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
            <p className="leading-[normal] whitespace-pre">Join our discord server</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}