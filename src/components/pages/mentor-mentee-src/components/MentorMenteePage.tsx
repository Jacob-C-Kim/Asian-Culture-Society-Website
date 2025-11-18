import EventsSection from "@/components/common/EventsSection";

function HeroSection({ onNavigate: _onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <section className="relative min-h-[500px] w-full overflow-hidden bg-acs-teal-alt font-inter md:min-h-[600px]">
      {/* Koi Fish Image positioned on the left */}
      <div className="absolute bottom-0 left-0 flex h-full w-full items-end justify-start">
        <img
          src="/assets/images/koi-fish.png"
          alt="Koi Fish Illustration"
          className="h-full w-auto object-contain object-left-bottom"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-6 py-20 text-center md:px-12 md:py-24 lg:px-16">
          {/* Title */}
          <h1
            className="text-[48px] font-black tracking-tight text-white md:text-[64px] lg:text-[80px]"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.6)",
            }}
          >
            Mentor/Mentee
          </h1>

          {/* Description */}
          <p
            className="max-w-3xl text-[18px] font-bold leading-relaxed text-white md:text-[20px] lg:text-[22px]"
            style={{
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8), 0px 0px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            The Mentor/Mentee Program connects upperclassmen with newer members to foster
            community, guidance, and growth. Mentors provide support in academics, campus life, and
            cultural involvement, while mentees gain a friend and resource to help them navigate
            college.
          </p>

          {/* Events Button */}
          <button
            className="mt-4 rounded-xl border-2 border-gray-700 bg-gray-800 px-10 py-4 text-[16px] font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:shadow-2xl md:text-[18px]"
            onClick={() => {
              const eventsSection = document.querySelector('[data-section="mentor-mentee-events"]');
              if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            aria-label="Scroll to Mentor/Mentee events section"
          >
            Events
          </button>
        </div>
      </div>
    </section>
  );
}

function MentorsSection() {
  return (
    <section className="min-h-[415px] bg-white py-16 font-inter">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-stretch justify-center gap-8 md:flex-row">
          {/* Mentors Column */}
          <article className="flex max-w-md flex-1 flex-col items-center text-center">
            <h2 className="mb-6 text-[24px] font-medium text-black md:text-[28px]">Mentors</h2>
            <ul className="flex-grow space-y-3 text-left text-[16px] text-black md:text-[18px]">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Meet new people and make real connections
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Build leadership and mentoring skills
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Share your experience and help someone out
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Extra Mentor/Mentee specific events
              </li>
            </ul>

            {/* Mentor Signup Button */}
            <div className="mt-8">
              <a
                href="https://campusgroups.rit.edu/ACS/mentor-sign-up/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block min-w-[240px] rounded-xl bg-acs-teal-alt px-8 py-4 text-center text-[16px] font-bold text-white no-underline shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#82C7C7] hover:shadow-xl md:text-[18px]"
              >
                Sign Up As A Mentor
              </a>
            </div>
          </article>

          {/* Mentees Column */}
          <article className="flex max-w-md flex-1 flex-col items-center text-center">
            <h2 className="mb-6 text-[24px] font-medium text-black md:text-[28px]">Mentees</h2>
            <ul className="flex-grow space-y-3 text-left text-[16px] text-black md:text-[18px]">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                A friendly mentor to help you navigate campus life
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Tips on classes, clubs, and making the most of college
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Someone you can go to for advice or questions
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-acs-teal-alt" aria-hidden="true">
                  •
                </span>
                Extra Mentor/Mentee specific events
              </li>
            </ul>

            {/* Mentee Signup Button */}
            <div className="mt-8">
              <a
                href="https://campusgroups.rit.edu/ACS/mentee-sign-up/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block min-w-[240px] rounded-xl bg-acs-slate px-8 py-4 text-center text-[16px] font-bold text-white no-underline shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1A252F] hover:shadow-xl md:text-[18px]"
              >
                Sign Up As A Mentee
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function MentorMenteePage({
  onNavigate,
  hideHeader: _hideHeader,
}: {
  onNavigate?: (page: string) => void;
  hideHeader?: boolean;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white">
      {/* White section at the top to prevent navigation gap during sticky transition */}
      <div className="h-20 w-full bg-white" aria-hidden="true" />
      <HeroSection onNavigate={onNavigate} />
      <MentorsSection />
      <div className="w-full">
        <EventsSection onNavigate={onNavigate} isMentorMentee={true} />
      </div>
    </main>
  );
}
