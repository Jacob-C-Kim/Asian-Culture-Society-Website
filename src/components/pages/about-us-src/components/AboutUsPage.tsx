export default function AboutUsPage() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-[#99E3ED]"
      data-name="About us"
    >
      {/* Desktop Layout */}
      <div className="mx-auto hidden w-full max-w-5xl items-center justify-center px-8 md:flex">
        <div className="flex items-center gap-16">
          {/* Left side - Text content */}
          <div className="flex flex-col items-start">
            {/* About Us Header */}
            <div className="mb-8" data-name="about us">
              <div className="font-['Lexend:Bold',_sans-serif] text-[25px] font-bold text-black">
                <p className="leading-[normal]">about us</p>
              </div>
              <div className="mt-2 h-[1px] w-full bg-[#195259]"></div>
            </div>

            {/* Main Description Text */}
            <div className="max-w-[425px]">
              <div className="font-['Lexend:Regular',_sans-serif] text-[18px] font-normal text-[#23464b]">
                <p className="leading-[1.4]">
                  Asian Culture Society is the largest student organization at RIT, bringing
                  together students who enjoy learning and sharing the history, culture, and art of
                  Asian countries. We foster a welcoming community and create a space for anyone
                  interested in Asian culture to connect, learn, and celebrate together. Along with
                  our weekly activities, we host some of the biggest cultural events on campus,
                  including our annual Night Market.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - ACS Logo */}
          <div className="flex flex-col items-center">
            <div className="relative size-[194px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logos/acs-logo-transparent.png"
                alt="Asian Culture Society Logo"
                className="h-full w-full rounded-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-8 md:hidden">
        {/* About Us Header */}
        <div className="mb-8 text-center">
          <div className="font-['Lexend:Bold',_sans-serif] text-[28px] font-bold text-black">
            <p className="leading-[normal]">about us</p>
          </div>
          <div className="mx-auto mt-2 h-[1px] w-32 bg-[#195259]"></div>
        </div>

        {/* ACS Logo */}
        <div className="mb-8">
          <div className="relative size-[150px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logos/acs-logo-transparent.png"
              alt="Asian Culture Society Logo"
              className="h-full w-full rounded-full object-contain"
            />
          </div>
        </div>

        {/* Main Description Text */}
        <div className="max-w-sm text-center">
          <div className="font-['Lexend:Regular',_sans-serif] text-[16px] font-normal text-[#23464b]">
            <p className="leading-[1.4]">
              Asian Culture Society is the largest student organization at RIT, bringing together
              students who enjoy learning and sharing the history, culture, and art of Asian
              countries. We foster a welcoming community and create a space for anyone interested in
              Asian culture to connect, learn, and celebrate together. Along with our weekly
              activities, we host some of the biggest cultural events on campus, including our
              annual Night Market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
