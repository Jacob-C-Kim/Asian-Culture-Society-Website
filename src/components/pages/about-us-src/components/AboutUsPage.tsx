export default function AboutUsPage() {
  const description =
    "Asian Culture Society is the largest student organization at RIT, bringing together students who enjoy learning and sharing the history, culture, and art of Asian countries. We foster a welcoming community and create a space for anyone interested in Asian culture to connect, learn, and celebrate together. Along with our weekly activities, we host some of the biggest cultural events on campus, including our annual Night Market.";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-acs-teal">
      {/* Desktop Layout */}
      <div className="mx-auto hidden w-full max-w-5xl items-center justify-center px-8 md:flex">
        <div className="flex items-center gap-16">
          {/* Left side - Text content */}
          <article className="flex flex-col items-start">
            {/* About Us Header */}
            <header className="mb-8">
              <h1 className="font-lexend text-[25px] font-bold text-black">about us</h1>
              <div className="mt-2 h-px w-full bg-acs-navy" aria-hidden="true" />
            </header>

            {/* Main Description Text */}
            <p className="max-w-[425px] font-lexend text-[18px] font-normal leading-[1.4] text-acs-navy-dark">
              {description}
            </p>
          </article>

          {/* Right side - ACS Logo */}
          <div className="flex flex-col items-center">
            <div className="relative size-[194px]">
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
        <header className="mb-8 text-center">
          <h1 className="font-lexend text-[28px] font-bold text-black">about us</h1>
          <div className="mx-auto mt-2 h-px w-32 bg-acs-navy" aria-hidden="true" />
        </header>

        {/* ACS Logo */}
        <div className="mb-8">
          <div className="relative size-[150px]">
            <img
              src="/assets/logos/acs-logo-transparent.png"
              alt="Asian Culture Society Logo"
              className="h-full w-full rounded-full object-contain"
            />
          </div>
        </div>

        {/* Main Description Text */}
        <p className="max-w-sm text-center font-lexend text-[16px] font-normal leading-[1.4] text-acs-navy-dark">
          {description}
        </p>
      </div>
    </main>
  );
}
