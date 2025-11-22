import imgTransparentLogo11 from "../assets/acs-logo-transparent.png";

function AboutUs() {
  return (
    <div className="relative size-full" data-name="about us">
      <div className="absolute bottom-0 flex flex-col font-['Lexend:Bold',_sans-serif] font-bold justify-center leading-[0] left-[13.79%] right-[-13.79%] text-[25px] text-black top-0">
        <p className="leading-[normal]">about us</p>
      </div>
      <div className="absolute bottom-0 left-[13.79%] right-[-10.84%] top-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 394 1">
            <line id="Line 1" stroke="var(--stroke-0, #195259)" x2="394" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-6 items-center justify-start top-3.5 translate-x-[-50%]" style={{ left: "calc(50% - 18px)" }}>
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">about</p>
      </div>
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">schedule</p>
      </div>
      <div className="bg-center bg-cover bg-no-repeat shrink-0 size-[61px]" data-name="Transparent Logo (1) 1" style={{ backgroundImage: `url('${imgTransparentLogo11}')` }} />
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">our eboard</p>
      </div>
      <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-black text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">alumni</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute h-[75px] overflow-clip top-[7px] translate-x-[-50%] w-[777px]" style={{ left: "calc(50% + 19px)" }}>
      <Frame5 />
    </div>
  );
}

export default function AboutUs1() {
  return (
    <div className="bg-[#bceef8] relative size-full" data-name="About us">
      <div className="absolute h-[61px] left-[19px] top-[132px] w-[406px]" data-name="about us">
        <AboutUs />
      </div>
      <Frame25 />
      <div className="absolute flex flex-col font-['Lexend:Regular',_sans-serif] font-normal h-[106px] justify-center leading-[0] left-[75px] text-[#23464b] text-[18px] top-60 translate-y-[-50%] w-[425px]">
        <p className="leading-[normal]">Asian Culture Society is a community of RIT students who enjoy learning and sharing the history, culture, and art of Asian countries.</p>
      </div>
      <div className="absolute left-[507px] size-[194px] top-[110px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 194 194">
          <circle cx="97" cy="97" fill="var(--fill-0, #D9D9D9)" id="Ellipse 8" r="97" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Lexend:Bold',_sans-serif] font-bold h-[37px] justify-center leading-[0] left-[602px] text-[18px] text-black text-center top-[206.5px] translate-x-[-50%] translate-y-[-50%] w-[92px]">
        <p className="leading-[normal]">(picture)</p>
      </div>
    </div>
  );
}