import EventsSection from "./EventsSection";
import koiFishImage from "../assets/a5d3332fda9431ae902f1c45d60dc0351c6d5df0.png";

function HeroSection({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden" style={{ backgroundColor: '#94D1D0', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Koi Fish Image positioned on the left */}
      <div className="absolute left-0 bottom-0 w-full h-full flex items-end justify-start">
        <img 
          src={koiFishImage.src} 
          alt="Koi Fish Illustration" 
          className="h-full w-auto object-contain object-left-bottom"
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6 items-center justify-center text-center py-20 md:py-24">
          {/* Title */}
          <h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] font-black tracking-tight" 
              style={{ 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.6)',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>
            Mentor/Mentee
          </h1>
          
          {/* Description */}
          <div className="max-w-3xl">
            <p className="text-white text-[18px] md:text-[20px] lg:text-[22px] font-bold leading-relaxed"
               style={{ 
                 textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8), 0px 0px 6px rgba(0, 0, 0, 0.5)',
                 fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
               }}>
              The Mentor/Mentee Program connects upperclassmen with newer members to foster community, guidance, and growth. Mentors provide support in academics, campus life, and cultural involvement, while mentees gain a friend and resource to help them navigate college.
            </p>
          </div>
          
          {/* Events Button */}
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold text-[16px] md:text-[18px] px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mt-4 border-2 border-gray-700"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
            onClick={() => {
              const eventsSection = document.querySelector('[data-section="mentor-mentee-events"]');
              if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Events
          </button>
        </div>
      </div>
    </div>
  );
}

function MentorsSection() {
  return (
    <div className="min-h-[415px] bg-white py-16" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {/* Mentors Column */}
          <div className="flex flex-col items-center text-center flex-1 max-w-md">
            <h2 className="text-[24px] md:text-[28px] font-medium text-black mb-6">
              Mentors
            </h2>
            <ul className="text-[16px] md:text-[18px] text-black space-y-3 text-left flex-grow">
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Meet new people and make real connections
              </li>
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Build leadership and mentoring skills
              </li>
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Share your experience and help someone out
              </li>
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Extra Mentor/Mentee specific events
              </li>
            </ul>
            
            {/* Mentor Signup Button */}
            <div className="mt-8">
              <a 
                href="https://campusgroups.rit.edu/ACS/mentor-sign-up/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#94D1D0] hover:bg-[#82C7C7] text-white font-bold text-[16px] md:text-[18px] px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[240px] text-center no-underline inline-block"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                Sign Up As A Mentor
              </a>
            </div>
          </div>
          
          {/* Mentees Column */}
          <div className="flex flex-col items-center text-center flex-1 max-w-md">
            <h2 className="text-[24px] md:text-[28px] font-medium text-black mb-6">
              Mentees
            </h2>
            <ul className="text-[16px] md:text-[18px] text-black space-y-3 text-left flex-grow">
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                A friendly mentor to help you navigate campus life
              </li>
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Tips on classes, clubs, and making the most of college
              </li>
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Someone you can go to for advice or questions
              </li>
              <li className="flex items-start">
                <span className="text-[#94D1D0] mr-3 mt-1">•</span>
                Extra Mentor/Mentee specific events
              </li>
            </ul>
            
            {/* Mentee Signup Button */}
            <div className="mt-8">
              <a 
                href="https://campusgroups.rit.edu/ACS/mentee-sign-up/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#2C3E50] hover:bg-[#1A252F] text-white font-bold text-[16px] md:text-[18px] px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[240px] text-center no-underline inline-block"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                Sign Up As A Mentee
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MentorMenteePage({ onNavigate, hideHeader }: { onNavigate?: (page: string) => void; hideHeader?: boolean }) {
  return (
    <div className="bg-white flex flex-col w-full min-h-screen">
      {/* White section at the top to prevent navigation gap during sticky transition */}
      <div className="w-full bg-white h-20"></div>
      <HeroSection onNavigate={onNavigate} />
      <MentorsSection />
      <div className="w-full">
        <EventsSection onNavigate={onNavigate} isMentorMentee={true} />
      </div>
    </div>
  );
}