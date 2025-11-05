import imgColumn2 from "figma:asset/7d8380adaae1cd33a31168570eb65b7707216808.png";
import imgColumn3 from "figma:asset/1b1fe005aec6b48895acd4562a9091a6d2cf842b.png";
import modernTinklingImage from "figma:asset/a12f5a083a60db2a7a8958cc4c45d9171bf665f1.png";
import discordSvgPaths from "../imports/svg-3075tc4bla";

function SignUpButton() {
  return (
    <a 
      href="https://campusgroups.rit.edu/ACS/tinikling-sign-up/"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[280px]"
    >
      <div className="bg-black relative rounded-[10px] size-full hover:bg-gray-800 transition-all duration-200">
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip px-[30px] py-3 relative size-full">
            <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-nowrap text-white">
              <p className="leading-[normal] whitespace-pre">Sign Up for Tinikling</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-black inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </a>
  );
}

function TinklingContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-3 md:gap-5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Column 1">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[32px] md:text-[48px] text-black text-center md:text-left w-full tracking-[-0.32px] md:tracking-[-0.48px]">
        <p className="leading-[normal] whitespace-pre">Tinikling</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium leading-[0] w-full relative shrink-0 text-[#212121] text-[14px] md:text-[18px]">
        <p className="leading-[normal]">Tinikling is a Filipino group dance where you jump in and out of bamboo poles in rhythm. It's easy to learn, but the fun challenge is avoiding getting clicked by the sticks. At ACS, we dance to both traditional Filipino music and modern pop, and we even mix in modern dance moves to keep it fresh and exciting. We hold practices every Saturday from 1:00 PM to 3:00 PM in Upper Dance Studio.</p>
      </div>
      <SignUpButton />
    </div>
  );
}

function TinklingImage() {
  return <div className="bg-center bg-cover bg-no-repeat h-[200px] md:h-[340px] rounded-[18px] shrink-0 w-full md:w-[308px]" data-name="Column 2" style={{ backgroundImage: `url('${imgColumn2}')` }} />;
}

function TinklingSection() {
  return (
    <div className="content-stretch flex flex-col md:flex-row gap-5 items-start justify-start relative shrink-0 w-full" data-name="Wrapper">
      <TinklingContent />
      <div className="flex items-start justify-start md:justify-start shrink-0 w-full md:w-[308px]">
        <TinklingImage />
      </div>
    </div>
  );
}

function TinklingHero() {
  return (
    <div className="bg-[#FFD1ED] relative shrink-0 w-full" data-name="First Thing">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center pb-5 md:pb-8 pt-24 md:pt-32 px-4 md:px-[45px] relative w-full">
          <TinklingSection />
        </div>
      </div>
    </div>
  );
}

function BackstoryImage() {
  return <div className="bg-center bg-cover bg-no-repeat h-[200px] md:h-[340px] rounded-[18px] shrink-0 w-full md:w-[395px]" data-name="Column 2" style={{ backgroundImage: `url('${imgColumn3}')` }} />;
}

function BackstoryContent() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-3 md:gap-5 grow items-start justify-start leading-[0] min-h-px min-w-px px-0 py-2.5 relative shrink-0" data-name="Column 1">
      <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[28px] md:text-[36px] text-black text-center md:text-left w-full tracking-[-0.28px] md:tracking-[-0.36px]">
        <p className="leading-[normal] whitespace-pre">Origins</p>
      </div>
      <div className="font-['Lexend:Medium',_sans-serif] font-medium w-full relative shrink-0 text-[#212121] text-[14px] md:text-[18px]">
        <p className="leading-[normal]">Farmers in the Philippines often had problems with tikling birds eating their rice crops. To protect the fields, they built traps from bamboo poles that would snap together when a bird walked between them. Some birds were caught, but many managed to escape by quickly jumping aside or darting through the poles without getting hurt. These quick and skillful movements inspired the creation of Tinikling, a dance that imitates the way the birds moved to avoid the traps. The word "tinikling" comes from "tikling," and the dance is meant to capture both the grace and the agility of the bird.</p>
      </div>
    </div>
  );
}

function BackstorySection() {
  return (
    <div className="content-stretch flex flex-col md:flex-row gap-5 items-start justify-start relative shrink-0 w-full" data-name="Wrapper">
      <BackstoryImage />
      <BackstoryContent />
    </div>
  );
}

function BackstoryWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="First Thing">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-5 items-start justify-center pb-[25px] pt-5 px-4 md:px-[45px] relative w-full">
          <BackstorySection />
        </div>
      </div>
    </div>
  );
}

function ModernVariationsImage() {
  return <div className="bg-center bg-cover bg-no-repeat h-[200px] md:h-[340px] rounded-[18px] shrink-0 w-full md:w-[395px]" data-name="Column 2" style={{ backgroundImage: `url('${modernTinklingImage}')` }} />;
}

function DiscordButton() {
  return (
    <a 
      href="https://discord.gg/D6CGMzpBze"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[320px]"
    >
      <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[10px] size-full hover:bg-[rgba(255,255,255,0.15)] transition-all duration-200">
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip px-[40px] py-3 relative size-full">
            <div className="h-[18.921px] relative shrink-0 w-6" data-name="Vector">
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 19">
                <path d={discordSvgPaths.p1d146f00} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
              <p className="leading-[normal] whitespace-pre">Join the Tinikling Discord server</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </a>
  );
}

function ModernVariationsContent() {
  return (
    <div className="flex flex-col gap-3 md:gap-5 items-start justify-center" data-name="Column 1">
      <div className="font-['Lexend:Medium',_sans-serif] font-medium w-full text-white text-[14px] md:text-[18px]">
        <p className="leading-[normal]">Over time, Tinikling's quick footwork and rhythmic timing have also inspired modern variations. Today, groups often dance to pop and hip hop songs, since the fast-paced beats match the energy of the traditional style and make it even more exciting to perform.</p>
      </div>
      <DiscordButton />
    </div>
  );
}



function ModernVariationsWrapper() {
  return (
    <div className="bg-black relative shrink-0 w-full" data-name="Modern Variations">
      <div className="flex flex-col md:flex-row gap-5 items-stretch justify-start px-4 md:px-[45px] py-5 relative w-full">
        <div className="basis-0 grow flex flex-col justify-center p-5">
          <ModernVariationsContent />
        </div>
        <div className="rounded-[18px] flex items-center justify-center p-5 shrink-0 w-full md:w-[395px]">
          <ModernVariationsImage />
        </div>
      </div>
    </div>
  );
}

function BottomSpacer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Second THing">
      <div className="relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

export default function TinklingPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-start relative size-full">
      <TinklingHero />
      <BackstoryWrapper />
      <ModernVariationsWrapper />
      <BottomSpacer />
    </div>
  );
}