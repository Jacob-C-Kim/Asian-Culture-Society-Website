import imgTransparentLogo11 from "figma:asset/cf24fa2e75050490ba08976eeb14a37355b03c67.png";
import imgColumn2 from "figma:asset/7d8380adaae1cd33a31168570eb65b7707216808.png";
import imgColumn3 from "figma:asset/1b1fe005aec6b48895acd4562a9091a6d2cf842b.png";

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
        <p className="leading-[normal] whitespace-pre">Tinikling</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[#212121] text-[18px]" style={{ width: "min-content" }}>
        <p className="leading-[normal]">Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla</p>
      </div>
      <Frame6 />
    </div>
  );
}

function Column2() {
  return <div className="bg-center bg-cover bg-no-repeat h-[340px] rounded-[18px] shrink-0 w-[308px]" data-name="Column 2" style={{ backgroundImage: `url('${imgColumn2}')` }} />;
}

function Wrapper() {
  return (
    <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-name="Wrapper">
      <Column1 />
      <Column2 />
    </div>
  );
}

function FirstThing() {
  return (
    <div className="bg-[#99e3ed] relative shrink-0 w-full" data-name="First Thing">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center pb-0 pt-2.5 px-[45px] relative w-full">
          <Frame25 />
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return <div className="bg-center bg-cover bg-no-repeat h-[340px] rounded-[18px] shrink-0 w-[395px]" data-name="Column 2" style={{ backgroundImage: `url('${imgColumn3}')` }} />;
}

function Column4() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-5 grow items-start justify-start leading-[0] min-h-px min-w-px px-0 py-2.5 relative shrink-0" data-name="Column 1">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[36px] text-black text-center text-nowrap tracking-[-0.36px]">
        <p className="leading-[normal] whitespace-pre">Backstory</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium min-w-full relative shrink-0 text-[#212121] text-[18px]" style={{ width: "min-content" }}>
        <p className="leading-[normal]">Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla Mentor mentee is about bla bla and bla</p>
      </div>
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-name="Wrapper">
      <Column3 />
      <Column4 />
    </div>
  );
}

function FirstThing1() {
  return (
    <div className="relative shrink-0 w-full" data-name="First Thing">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center pb-[25px] pt-5 px-[45px] relative w-full">
          <Wrapper1 />
        </div>
      </div>
    </div>
  );
}

function SecondTHing() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Second THing">
      <div className="relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-start relative size-full">
      <FirstThing />
      <FirstThing1 />
      <SecondTHing />
    </div>
  );
}