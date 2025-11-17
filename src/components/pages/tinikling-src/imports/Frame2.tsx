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
        <p className="whitespace-pre leading-[normal]">Tinikling</p>
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

function Column2() {
  return (
    <div
      className="h-[340px] w-[308px] shrink-0 rounded-[18px] bg-cover bg-center bg-no-repeat"
      data-name="Column 2"
      style={{ backgroundImage: `url('/assets/images/tinikling-column-2.png')` }}
    />
  );
}

function Wrapper() {
  return (
    <div
      className="relative flex w-full shrink-0 content-stretch items-start justify-start gap-5"
      data-name="Wrapper"
    >
      <Column1 />
      <Column2 />
    </div>
  );
}

function FirstThing() {
  return (
    <div className="relative w-full shrink-0 bg-[#99e3ed]" data-name="First Thing">
      <div className="relative flex size-full flex-col justify-center overflow-clip">
        <div className="relative box-border flex w-full flex-col content-stretch items-start justify-center gap-5 px-[45px] pb-0 pt-2.5">
          <Frame25 />
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div
      className="h-[340px] w-[395px] shrink-0 rounded-[18px] bg-cover bg-center bg-no-repeat"
      data-name="Column 2"
      style={{ backgroundImage: `url('/assets/images/tinikling-column-3.png')` }}
    />
  );
}

function Column4() {
  return (
    <div
      className="relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-start justify-start gap-5 px-0 py-2.5 leading-[0]"
      data-name="Column 1"
    >
      <div className="relative shrink-0 text-nowrap text-center font-['Lexend:Bold',_sans-serif] text-[36px] font-bold tracking-[-0.36px] text-black">
        <p className="whitespace-pre leading-[normal]">Backstory</p>
      </div>
      <div
        className="relative min-w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[18px] font-medium text-[#212121]"
        style={{ width: "min-content" }}
      >
        <p className="leading-[normal]">
          Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor
          mentee is about bla bla and bla Mentor mentee is about bla bla and bla
        </p>
      </div>
    </div>
  );
}

function Wrapper1() {
  return (
    <div
      className="relative flex w-full shrink-0 content-stretch items-start justify-start gap-5"
      data-name="Wrapper"
    >
      <Column3 />
      <Column4 />
    </div>
  );
}

function FirstThing1() {
  return (
    <div className="relative w-full shrink-0" data-name="First Thing">
      <div className="relative flex size-full flex-col justify-center overflow-clip">
        <div className="relative box-border flex w-full flex-col content-stretch items-start justify-center gap-5 px-[45px] pb-[25px] pt-5">
          <Wrapper1 />
        </div>
      </div>
    </div>
  );
}

function SecondTHing() {
  return (
    <div
      className="relative min-h-px w-full min-w-px shrink-0 grow basis-0"
      data-name="Second THing"
    >
      <div className="relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative flex size-full flex-col content-stretch items-center justify-start bg-white">
      <FirstThing />
      <FirstThing1 />
      <SecondTHing />
    </div>
  );
}
