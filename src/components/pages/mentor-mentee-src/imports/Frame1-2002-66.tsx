import svgPaths from "./svg-lxb58x5013";

function Mentors() {
  return (
    <div className="relative size-full" data-name="Mentors">
      <div className="relative flex size-full flex-col items-center justify-center">
        <div className="relative box-border flex size-full flex-col content-stretch items-center justify-center px-2.5 py-0">
          <div className="size-[150px] shrink-0" />
          <div className="relative shrink-0 text-nowrap font-['Lexend:Medium',_sans-serif] text-[24px] font-medium leading-[0] text-black">
            <p className="whitespace-pre leading-[normal]">Mentors</p>
          </div>
          <div className="relative shrink-0 text-nowrap font-['Lexend:Medium',_sans-serif] text-[18px] font-medium leading-[0] text-black">
            <p className="whitespace-pre leading-[normal]">stuff stuff incentives</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute left-[196px] top-0 flex h-[61px] w-[349px] content-stretch items-center justify-start gap-6">
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
    <div className="relative h-[61px] w-[800px] shrink-0 overflow-clip rounded-[15px]">
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative box-border flex shrink-0 content-stretch items-center justify-center gap-2.5 overflow-clip rounded-[10px] bg-[#2f2f2f] px-5 py-[7px]">
      <div className="relative shrink-0 text-nowrap font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[14px] not-italic leading-[0] text-[#99e3ed]">
        <p className="whitespace-pre leading-[normal]">events</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div
      className="relative flex min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-start justify-start gap-5"
      data-name="Column 1"
    >
      <div className="relative shrink-0 text-nowrap text-center font-['Lexend:Bold',_sans-serif] text-[48px] font-bold leading-[0] tracking-[-0.48px] text-black">
        <p className="whitespace-pre leading-[normal]">Mentor Mentee</p>
      </div>
      <div
        className="relative min-w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[18px] font-medium leading-[0] text-[#212121]"
        style={{ width: "min-content" }}
      >
        <p className="leading-[normal]">
          Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor
          mentee is about bla bla and bla Mentor mentee is about bla bla and bla
        </p>
      </div>
      <Frame6 />
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="relative flex w-full shrink-0 content-stretch items-start justify-start gap-5"
      data-name="Wrapper"
    >
      <Column1 />
    </div>
  );
}

function FirstThing() {
  return (
    <div className="relative w-full shrink-0 bg-[#99e3ed]" data-name="First Thing">
      <div className="relative flex size-full flex-col justify-center overflow-clip">
        <div className="relative box-border flex w-full flex-col content-stretch items-start justify-center gap-5 px-[45px] pb-[25px] pt-2.5">
          <Frame25 />
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return <div className="size-[150px] shrink-0" />;
}

function Mentors1() {
  return (
    <div className="relative min-h-px min-w-px shrink-0 grow basis-0" data-name="Mentors">
      <div className="relative flex size-full flex-col items-center justify-center overflow-clip">
        <div className="relative box-border flex w-full flex-col content-stretch items-center justify-center px-2.5 py-0">
          <Frame29 />
          <div className="relative shrink-0 text-nowrap font-['Lexend:Medium',_sans-serif] text-[24px] font-medium leading-[0] text-black">
            <p className="whitespace-pre leading-[normal]">Mentees</p>
          </div>
          <div className="relative shrink-0 text-nowrap font-['Lexend:Medium',_sans-serif] text-[18px] font-medium leading-[0] text-black">
            <p className="whitespace-pre leading-[normal]">YOu get a senior to give you rides</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondTHing() {
  return (
    <div className="relative h-[415px] w-full shrink-0" data-name="Second THing">
      <div className="relative size-full overflow-clip">
        <div className="relative box-border flex h-[415px] w-full content-stretch items-start justify-start gap-2.5 px-[45px] py-2.5">
          <div className="relative min-h-px min-w-px shrink-0 grow basis-0" data-name="Mentors">
            <Mentors />
          </div>
          <Mentors1 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute left-[18px] top-[94px] flex w-[237px] flex-col content-stretch items-start justify-start leading-[0] text-black">
      <div className="relative w-full shrink-0 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold">
        <p className="leading-[normal]">ACS GBM</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
        <p className="leading-[normal]">5:00 PM - 7:00 PM @ Bamboo Room RIT</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative h-[265px] w-[351px] shrink-0 rounded-[15px] bg-[#99e3ed]">
      <div className="relative h-[265px] w-[351px] overflow-clip">
        <Frame8 />
        <div className="absolute left-[298px] top-[94px] size-9 rounded-[15px] bg-white" />
        <div className="absolute left-[18px] top-[156px] w-[316px] font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
          <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
      />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute left-[18px] top-[94px] flex w-[237px] flex-col content-stretch items-start justify-start leading-[0]">
      <div className="relative w-full shrink-0 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold text-[#061314]">
        <p className="leading-[normal]">ACS GBM</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium text-[#195259]">
        <p className="leading-[normal]">5:00 PM - 7:00 PM @ Bamboo Room RIT</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium text-[#195259]">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute left-72 top-[84px] box-border flex content-stretch items-center justify-start gap-2.5 p-[10px]">
      <div className="relative size-9 shrink-0 rounded-[15px] bg-[rgba(255,255,255,0.5)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
        />
      </div>
    </div>
  );
}

function CalendarDays() {
  return (
    <div className="absolute left-[305.5px] top-[100px] h-6 w-[21px]" data-name="calendar-days">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 24">
        <g id="calendar-days">
          <path d={svgPaths.p3ca7b300} fill="var(--fill-0, #195259)" id="Primary" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative h-[265px] w-[351px] shrink-0 rounded-[15px] bg-[#99e3ed]">
      <div className="relative h-[265px] w-[351px] overflow-clip">
        <Frame10 />
        <Frame17 />
        <CalendarDays />
        <div className="absolute left-[18px] top-[156px] w-[316px] font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-[#061314]">
          <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
      />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute left-[18px] top-[94px] flex w-[237px] flex-col content-stretch items-start justify-start leading-[0] text-black">
      <div className="relative w-full shrink-0 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold">
        <p className="leading-[normal]">Eboard Applications are</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
        <p className="leading-[normal] underline decoration-solid [text-underline-position:from-font]">
          Apply now
        </p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative h-[265px] w-[351px] shrink-0 rounded-[15px] bg-[#99e3ed]">
      <div className="relative h-[265px] w-[351px] overflow-clip">
        <Frame11 />
        <div className="absolute left-[298px] top-[94px] size-9 rounded-[15px] bg-[#d9d9d9]" />
        <div className="absolute left-[18px] top-[156px] w-[316px] font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
          <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
      />
    </div>
  );
}

function EventsCarasoul() {
  return (
    <div
      className="relative flex shrink-0 content-stretch items-center justify-start gap-5"
      data-name="Events Carasoul"
    >
      <Frame9 />
      <Frame7 />
      <Frame12 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative h-2.5 w-[130px] shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130 10">
        <g id="Frame-19">
          <circle
            cx="5"
            cy="5"
            fill="var(--fill-0, white)"
            fillOpacity="0.5"
            id="Ellipse-1"
            r="5"
          />
          <circle
            cx="30"
            cy="5"
            fill="var(--fill-0, white)"
            fillOpacity="0.5"
            id="Ellipse-3"
            r="5"
          />
          <g id="Frame-20">
            <rect
              fill="var(--fill-0, white)"
              fillOpacity="0.7"
              height="10"
              rx="5"
              width="30"
              x="50"
            />
          </g>
          <circle
            cx="100"
            cy="5"
            fill="var(--fill-0, white)"
            fillOpacity="0.5"
            id="Ellipse-4"
            r="5"
          />
          <circle
            cx="125"
            cy="5"
            fill="var(--fill-0, white)"
            fillOpacity="0.5"
            id="Ellipse-2"
            r="5"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative box-border flex h-full w-[800px] shrink-0 flex-col content-stretch items-center justify-start gap-[15px] overflow-clip bg-[#99e3ed] px-0 pb-[15px] pt-[25px]">
      <EventsCarasoul />
      <Frame19 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-start justify-start gap-2.5 overflow-clip">
      <Frame15 />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="relative flex size-full flex-col content-stretch items-center justify-start bg-white">
      <FirstThing />
      <SecondTHing />
      <Frame28 />
    </div>
  );
}
