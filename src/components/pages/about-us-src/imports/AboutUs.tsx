function AboutUs() {
  return (
    <div className="relative size-full" data-name="about us">
      <div className="absolute bottom-0 left-[13.79%] right-[-13.79%] top-0 flex flex-col justify-center font-['Lexend:Bold',_sans-serif] text-[25px] font-bold leading-[0] text-black">
        <p className="leading-[normal]">about us</p>
      </div>
      <div className="absolute bottom-0 left-[13.79%] right-[-10.84%] top-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 394 1"
          >
            <line id="Line 1" stroke="var(--stroke-0, #195259)" x2="394" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div
      className="absolute top-3.5 flex translate-x-[-50%] content-stretch items-center justify-start gap-6"
      style={{ left: "calc(50% - 18px)" }}
    >
      <div className="relative shrink-0 text-nowrap text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
        <p className="whitespace-pre leading-[normal]">about</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
        <p className="whitespace-pre leading-[normal]">schedule</p>
      </div>
      <div
        className="size-[61px] shrink-0 bg-cover bg-center bg-no-repeat"
        data-name="Transparent Logo (1) 1"
        style={{ backgroundImage: `url('/assets/logos/acs-logo-transparent.png')` }}
      />
      <div className="relative shrink-0 text-nowrap text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
        <p className="whitespace-pre leading-[normal]">our eboard</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
        <p className="whitespace-pre leading-[normal]">alumni</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div
      className="absolute top-[7px] h-[75px] w-[777px] translate-x-[-50%] overflow-clip"
      style={{ left: "calc(50% + 19px)" }}
    >
      <Frame5 />
    </div>
  );
}

export default function AboutUs1() {
  return (
    <div className="relative size-full bg-[#bceef8]" data-name="About us">
      <div className="absolute left-[19px] top-[132px] h-[61px] w-[406px]" data-name="about us">
        <AboutUs />
      </div>
      <Frame25 />
      <div className="absolute left-[75px] top-60 flex h-[106px] w-[425px] translate-y-[-50%] flex-col justify-center font-['Lexend:Regular',_sans-serif] text-[18px] font-normal leading-[0] text-[#23464b]">
        <p className="leading-[normal]">
          Asian Culture Society is a community of RIT students who enjoy learning and sharing the
          history, culture, and art of Asian countries.
        </p>
      </div>
      <div className="absolute left-[507px] top-[110px] size-[194px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 194 194"
        >
          <circle cx="97" cy="97" fill="var(--fill-0, #D9D9D9)" id="Ellipse 8" r="97" />
        </svg>
      </div>
      <div className="absolute left-[602px] top-[206.5px] flex h-[37px] w-[92px] translate-x-[-50%] translate-y-[-50%] flex-col justify-center text-center font-['Lexend:Bold',_sans-serif] text-[18px] font-bold leading-[0] text-black">
        <p className="leading-[normal]">(picture)</p>
      </div>
    </div>
  );
}
