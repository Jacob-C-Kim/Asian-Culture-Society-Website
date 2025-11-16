function Frame2() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center justify-start gap-6">
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
        <p className="whitespace-pre leading-[normal]">join us</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative flex shrink-0 flex-col content-stretch items-center justify-start leading-[0] text-black">
      <div
        className="relative min-w-full shrink-0 font-['Lexend:Regular',_sans-serif] text-[18px] font-normal"
        style={{ width: "min-content" }}
      >
        <p className="leading-[normal]">welcome to</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-center font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[40px] not-italic">
        <p className="whitespace-pre leading-[normal]">asian culture society</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative box-border flex shrink-0 content-stretch items-center justify-center gap-2.5 overflow-clip rounded-[10px] bg-[#a9e1eb] px-5 py-[7px]">
      <div className="relative shrink-0 text-nowrap font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[14px] not-italic leading-[0] text-black">
        <p className="whitespace-pre leading-[normal]">events</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative flex shrink-0 flex-col content-stretch items-center justify-start gap-[5px]">
      <Frame3 />
      <div className="relative h-9 w-full shrink-0 text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-black">
        <p className="leading-[normal]">
          RIT’s largest Asian club, bringing students together to celebrate, learn, and share the
          rich history, culture, and art of Asian countries
        </p>
      </div>
      <div className="relative h-9 w-full shrink-0 text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[normal] text-black">
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
      <Frame5 />
    </div>
  );
}

export default function Frame22() {
  return (
    <div className="relative box-border flex size-full flex-col content-stretch items-center justify-start gap-[72px] px-0 pb-[100px] pt-[5px]">
      <Frame2 />
      <Frame4 />
    </div>
  );
}
