import svgPaths from "./svg-lxb58x5013";
import imgTransparentLogo11 from "../assets/cf24fa2e75050490ba08976eeb14a37355b03c67.png";

function Mentors() {
  return (
    <div className="relative size-full" data-name="Mentors">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center px-2.5 py-0 relative size-full">
          <div className="shrink-0 size-[150px]" />
          <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[24px] text-black text-nowrap">
            <p className="leading-[normal] whitespace-pre">Mentors</p>
          </div>
          <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[18px] text-black text-nowrap">
            <p className="leading-[normal] whitespace-pre">stuff stuff incentives</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-6 h-[61px] items-center justify-start left-[196px] top-0 w-[349px]">
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
    <div className="h-[61px] overflow-clip relative rounded-[15px] shrink-0 w-[800px]">
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#2f2f2f] box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip px-5 py-[7px] relative rounded-[10px] shrink-0">
      <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#99e3ed] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">events</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Column 1">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[48px] text-black text-center text-nowrap tracking-[-0.48px]">
        <p className="leading-[normal] whitespace-pre">Mentor Mentee</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[#212121] text-[18px]" style={{ width: "min-content" }}>
        <p className="leading-[normal]">Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla</p>
      </div>
      <Frame6 />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-name="Wrapper">
      <Column1 />
    </div>
  );
}

function FirstThing() {
  return (
    <div className="bg-[#99e3ed] relative shrink-0 w-full" data-name="First Thing">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center pb-[25px] pt-2.5 px-[45px] relative w-full">
          <Frame25 />
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return <div className="shrink-0 size-[150px]" />;
}

function Mentors1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Mentors">
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center px-2.5 py-0 relative w-full">
          <Frame29 />
          <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[24px] text-black text-nowrap">
            <p className="leading-[normal] whitespace-pre">Mentees</p>
          </div>
          <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[18px] text-black text-nowrap">
            <p className="leading-[normal] whitespace-pre">YOu get a senior to give you rides</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondTHing() {
  return (
    <div className="h-[415px] relative shrink-0 w-full" data-name="Second THing">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2.5 h-[415px] items-start justify-start px-[45px] py-2.5 relative w-full">
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Mentors">
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
    <div className="absolute content-stretch flex flex-col items-start justify-start leading-[0] left-[18px] text-black top-[94px] w-[237px]">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[18px] w-full">
        <p className="leading-[normal]">ACS GBM</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
        <p className="leading-[normal]">5:00 PM - 7:00 PM @ Bamboo Room RIT</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#99e3ed] h-[265px] relative rounded-[15px] shrink-0 w-[351px]">
      <div className="h-[265px] overflow-clip relative w-[351px]">
        <Frame8 />
        <div className="absolute bg-white left-[298px] rounded-[15px] size-9 top-[94px]" />
        <div className="absolute font-['Lexend:Regular',_sans-serif] font-normal leading-[0] left-[18px] text-[12px] text-black top-[156px] w-[316px]">
          <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-start leading-[0] left-[18px] top-[94px] w-[237px]">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[#061314] text-[18px] w-full">
        <p className="leading-[normal]">ACS GBM</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[#195259] text-[12px] w-full">
        <p className="leading-[normal]">5:00 PM - 7:00 PM @ Bamboo Room RIT</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[#195259] text-[12px] w-full">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute box-border content-stretch flex gap-2.5 items-center justify-start left-72 p-[10px] top-[84px]">
      <div className="bg-[rgba(255,255,255,0.5)] relative rounded-[15px] shrink-0 size-9">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
      </div>
    </div>
  );
}

function CalendarDays() {
  return (
    <div className="absolute h-6 left-[305.5px] top-[100px] w-[21px]" data-name="calendar-days">
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
    <div className="bg-[#99e3ed] h-[265px] relative rounded-[15px] shrink-0 w-[351px]">
      <div className="h-[265px] overflow-clip relative w-[351px]">
        <Frame10 />
        <Frame17 />
        <CalendarDays />
        <div className="absolute font-['Lexend:Regular',_sans-serif] font-normal leading-[0] left-[18px] text-[#061314] text-[12px] top-[156px] w-[316px]">
          <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-start leading-[0] left-[18px] text-black top-[94px] w-[237px]">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[18px] w-full">
        <p className="leading-[normal]">Eboard Applications are</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
        <p className="[text-underline-position:from-font] decoration-solid leading-[normal] underline">Apply now</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
        <p className="leading-[normal]">June 5th, 2025</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#99e3ed] h-[265px] relative rounded-[15px] shrink-0 w-[351px]">
      <div className="h-[265px] overflow-clip relative w-[351px]">
        <Frame11 />
        <div className="absolute bg-[#d9d9d9] left-[298px] rounded-[15px] size-9 top-[94px]" />
        <div className="absolute font-['Lexend:Regular',_sans-serif] font-normal leading-[0] left-[18px] text-[12px] text-black top-[156px] w-[316px]">
          <p className="leading-[normal]">{`Our general board meeting is held every week and serves as a welcoming space for all ACS members to connect, relax, and have fun together. It’s a time when we gather not just to discuss any relevant updates, but to enjoy a variety of games, share tasty snacks, and spend time socializing. `}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

function EventsCarasoul() {
  return (
    <div className="content-stretch flex gap-5 items-center justify-start relative shrink-0" data-name="Events Carasoul">
      <Frame9 />
      <Frame7 />
      <Frame12 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-2.5 relative shrink-0 w-[130px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130 10">
        <g id="Frame 19">
          <circle cx="5" cy="5" fill="var(--fill-0, white)" fillOpacity="0.5" id="Ellipse 1" r="5" />
          <circle cx="30" cy="5" fill="var(--fill-0, white)" fillOpacity="0.5" id="Ellipse 3" r="5" />
          <g id="Frame 20">
            <rect fill="var(--fill-0, white)" fillOpacity="0.7" height="10" rx="5" width="30" x="50" />
          </g>
          <circle cx="100" cy="5" fill="var(--fill-0, white)" fillOpacity="0.5" id="Ellipse 4" r="5" />
          <circle cx="125" cy="5" fill="var(--fill-0, white)" fillOpacity="0.5" id="Ellipse 2" r="5" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#99e3ed] box-border content-stretch flex flex-col gap-[15px] h-full items-center justify-start overflow-clip pb-[15px] pt-[25px] px-0 relative shrink-0 w-[800px]">
      <EventsCarasoul />
      <Frame19 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="basis-0 content-stretch flex gap-2.5 grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0">
      <Frame15 />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-start relative size-full">
      <FirstThing />
      <SecondTHing />
      <Frame28 />
    </div>
  );
}