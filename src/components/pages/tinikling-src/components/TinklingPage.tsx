import discordSvgPaths from "../imports/svg-3075tc4bla";

function SignUpButton() {
  return (
    <a
      href="https://campusgroups.rit.edu/ACS/tinikling-sign-up/"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[280px]"
    >
      <div className="relative size-full rounded-[10px] bg-black transition-all duration-200 hover:bg-gray-800">
        <div className="relative flex size-full flex-row items-center">
          <div className="relative box-border flex size-full content-stretch items-center justify-center gap-2.5 overflow-clip px-[30px] py-3">
            <div className="relative shrink-0 text-nowrap font-['Lexend:Medium',_sans-serif] text-[14px] font-medium leading-[0] text-white">
              <p className="whitespace-pre leading-[normal]">Sign Up for Tinikling</p>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-black"
        />
      </div>
    </a>
  );
}

function TinklingContent() {
  return (
    <div
      className="relative flex min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-start justify-start gap-3 md:gap-5"
      data-name="Column 1"
    >
      <div className="relative w-full shrink-0 text-center font-['Lexend:Bold',_sans-serif] text-[32px] font-bold leading-[0] tracking-[-0.32px] text-black md:text-left md:text-[48px] md:tracking-[-0.48px]">
        <p className="whitespace-pre leading-[normal]">Tinikling</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[14px] font-medium leading-[0] text-[#212121] md:text-[18px]">
        <p className="leading-[normal]">
          Tinikling is a Filipino group dance where you jump in and out of bamboo poles in rhythm.
          It's easy to learn, but the fun challenge is avoiding getting clicked by the sticks. At
          ACS, we dance to both traditional Filipino music and modern pop, and we even mix in modern
          dance moves to keep it fresh and exciting. We hold practices every Saturday from 1:00 PM
          to 3:00 PM in Upper Dance Studio.
        </p>
      </div>
      <SignUpButton />
    </div>
  );
}

function TinklingImage() {
  return (
    <div
      className="h-[200px] w-full shrink-0 rounded-[18px] bg-cover bg-center bg-no-repeat md:h-[340px] md:w-[308px]"
      data-name="Column 2"
      style={{ backgroundImage: `url('/assets/images/tinikling-column-2.png')` }}
    />
  );
}

function TinklingSection() {
  return (
    <div
      className="relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-5 md:flex-row"
      data-name="Wrapper"
    >
      <TinklingContent />
      <div className="flex w-full shrink-0 items-start justify-start md:w-[308px] md:justify-start">
        <TinklingImage />
      </div>
    </div>
  );
}

function TinklingHero() {
  return (
    <div className="relative w-full shrink-0 bg-[#FFD1ED]" data-name="First Thing">
      <div className="relative flex size-full flex-col justify-center overflow-clip">
        <div className="relative box-border flex w-full flex-col content-stretch items-start justify-center gap-5 px-4 pb-5 pt-24 md:px-[45px] md:pb-8 md:pt-32">
          <TinklingSection />
        </div>
      </div>
    </div>
  );
}

function BackstoryImage() {
  return (
    <div
      className="h-[200px] w-full shrink-0 rounded-[18px] bg-cover bg-center bg-no-repeat md:h-[340px] md:w-[395px]"
      data-name="Column 2"
      style={{ backgroundImage: `url('/assets/images/tinikling-column-3.png')` }}
    />
  );
}

function BackstoryContent() {
  return (
    <div
      className="relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-start justify-start gap-3 px-0 py-2.5 leading-[0] md:gap-5"
      data-name="Column 1"
    >
      <div className="relative w-full shrink-0 text-center font-['Lexend:Bold',_sans-serif] text-[28px] font-bold tracking-[-0.28px] text-black md:text-left md:text-[36px] md:tracking-[-0.36px]">
        <p className="whitespace-pre leading-[normal]">Origins</p>
      </div>
      <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[14px] font-medium text-[#212121] md:text-[18px]">
        <p className="leading-[normal]">
          Farmers in the Philippines often had problems with tikling birds eating their rice crops.
          To protect the fields, they built traps from bamboo poles that would snap together when a
          bird walked between them. Some birds were caught, but many managed to escape by quickly
          jumping aside or darting through the poles without getting hurt. These quick and skillful
          movements inspired the creation of Tinikling, a dance that imitates the way the birds
          moved to avoid the traps. The word "tinikling" comes from "tikling," and the dance is
          meant to capture both the grace and the agility of the bird.
        </p>
      </div>
    </div>
  );
}

function BackstorySection() {
  return (
    <div
      className="relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-5 md:flex-row"
      data-name="Wrapper"
    >
      <BackstoryImage />
      <BackstoryContent />
    </div>
  );
}

function BackstoryWrapper() {
  return (
    <div className="relative w-full shrink-0" data-name="First Thing">
      <div className="relative flex size-full flex-col justify-center overflow-clip">
        <div className="relative box-border flex w-full flex-col content-stretch items-start justify-center gap-5 px-4 pb-[25px] pt-5 md:px-[45px]">
          <BackstorySection />
        </div>
      </div>
    </div>
  );
}

function ModernVariationsImage() {
  return (
    <div
      className="h-[200px] w-full shrink-0 rounded-[18px] bg-cover bg-center bg-no-repeat md:h-[340px] md:w-[395px]"
      data-name="Column 2"
      style={{ backgroundImage: `url('/assets/images/modern-tinikling.png')` }}
    />
  );
}

function DiscordButton() {
  return (
    <a
      href="https://discord.gg/D6CGMzpBze"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[320px]"
    >
      <div className="relative size-full rounded-[10px] bg-[rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.15)]">
        <div className="relative flex size-full flex-row items-center">
          <div className="relative box-border flex size-full content-stretch items-center justify-center gap-2.5 overflow-clip px-[40px] py-3">
            <div className="relative h-[18.921px] w-6 shrink-0" data-name="Vector">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 19"
              >
                <path d={discordSvgPaths.p1d146f00} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <div className="relative shrink-0 text-nowrap font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-white">
              <p className="whitespace-pre leading-[normal]">Join the Tinikling Discord server</p>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-white"
        />
      </div>
    </a>
  );
}

function ModernVariationsContent() {
  return (
    <div className="flex flex-col items-start justify-center gap-3 md:gap-5" data-name="Column 1">
      <div className="w-full font-['Lexend:Medium',_sans-serif] text-[14px] font-medium text-white md:text-[18px]">
        <p className="leading-[normal]">
          Over time, Tinikling's quick footwork and rhythmic timing have also inspired modern
          variations. Today, groups often dance to pop and hip hop songs, since the fast-paced beats
          match the energy of the traditional style and make it even more exciting to perform.
        </p>
      </div>
      <DiscordButton />
    </div>
  );
}

function ModernVariationsWrapper() {
  return (
    <div className="relative w-full shrink-0 bg-black" data-name="Modern Variations">
      <div className="relative flex w-full flex-col items-stretch justify-start gap-5 px-4 py-5 md:flex-row md:px-[45px]">
        <div className="flex grow basis-0 flex-col justify-center p-5">
          <ModernVariationsContent />
        </div>
        <div className="flex w-full shrink-0 items-center justify-center rounded-[18px] p-5 md:w-[395px]">
          <ModernVariationsImage />
        </div>
      </div>
    </div>
  );
}

function BottomSpacer() {
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

export default function TinklingPage() {
  return (
    <div className="relative flex size-full flex-col content-stretch items-center justify-start bg-white">
      <TinklingHero />
      <BackstoryWrapper />
      <ModernVariationsWrapper />
      <BottomSpacer />
    </div>
  );
}
