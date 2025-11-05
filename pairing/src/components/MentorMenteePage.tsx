import EventsSection from "./EventsSection";
import Footer from "./Footer";
import koiFishImage from "figma:asset/a5d3332fda9431ae902f1c45d60dc0351c6d5df0.png";
import exampleSlideImage from "figma:asset/184efa3c19da9909635f71c4e4fe84157ab529c0.png";

function HeroSection({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden" style={{ backgroundColor: '#94D1D0', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Koi Fish Image positioned on the left */}
      <div className="absolute left-0 bottom-0 w-full h-full flex items-end justify-start">
        <img 
          src={koiFishImage} 
          alt="Koi Fish Illustration" 
          className="h-full w-auto object-contain object-left-bottom"
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6 items-center justify-center text-center py-20 md:py-24">
          {/* Title */}
          <h1 className="text-white text-[40px] md:text-[56px] lg:text-[72px] font-black tracking-tight whitespace-nowrap" 
              style={{ 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.6)',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>
            Mentor/Mentee Pairing
          </h1>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <a
              href="https://docs.google.com/presentation/d/14LiD6GO17FrBhv9hPHkrTDNdGWSZU4-Wfl8ba7MXTOY/edit?slide=id.p#slide=id.p"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-[#2C3E50] font-bold text-[16px] md:text-[18px] px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white no-underline text-center"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
            >
              View Introduction Slides
            </a>
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold text-[16px] md:text-[18px] px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-700"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              onClick={() => {
                const pairingSection = document.querySelector('[data-section="pairing-info"]');
                if (pairingSection) {
                  pairingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Get Paired
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PairingSection() {
  return (
    <div 
      className="bg-white py-16" 
      style={{ 
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' 
      }}
      data-section="pairing-info"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-medium text-black mb-4">
            How Pairing Works
          </h2>
          <p className="text-[18px] md:text-[20px] text-gray-700 max-w-3xl mx-auto">
            Connect with fellow ACS members through our mentor/mentee pairing process. 
            <span className="block mt-2 text-[#2C3E50] font-medium">Pairing is due October 1st.</span>
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-[#94D1D0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-[24px] font-bold">1</span>
            </div>
            <h3 className="text-[20px] font-medium text-black mb-3">Create Your Slide</h3>
            <p className="text-[16px] text-gray-600">
              Make an introduction slide about yourself to share with potential matches
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#94D1D0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-[24px] font-bold">2</span>
            </div>
            <h3 className="text-[20px] font-medium text-black mb-3">Choose Your Top 5</h3>
            <p className="text-[16px] text-gray-600">
              Fill out our pairing form and select your top 5 preferred matches
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#94D1D0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-[24px] font-bold">3</span>
            </div>
            <h3 className="text-[20px] font-medium text-black mb-3">Get Matched</h3>
            <p className="text-[16px] text-gray-600">
              We'll pair you with a compatible mentor or mentee based on your top 5 choices
            </p>
          </div>
        </div>

        {/* Slide Requirements */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-[20px] font-medium text-black mb-4 flex items-center">
              <span className="bg-[#2C3E50] text-white px-3 py-1 rounded-full text-[14px] font-bold mr-3">MENTOR</span>
              Slide Requirements
            </h3>
            <p className="text-[16px] text-gray-800 mb-3">
              <strong className="text-black">Required:</strong> You must create an introduction slide to participate as a mentor.
            </p>
            <p className="text-[14px] text-gray-600">
              Your slide helps mentees get to know you and decide if you'd be a good match for their needs.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-[20px] font-medium text-black mb-4 flex items-center">
              <span className="bg-[#94D1D0] text-white px-3 py-1 rounded-full text-[14px] font-bold mr-3">MENTEE</span>
              Slide Requirements
            </h3>
            <p className="text-[16px] text-gray-800 mb-3">
              <strong className="text-black">Optional:</strong> Creating a slide is helpful but not required.
            </p>
            <p className="text-[14px] text-gray-600">
              A slide helps mentors understand your background and interests, leading to better matches.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdNSMOqXGCuUCt1SmD48huGZqr5HkHMOUFuuydhmz5Yw99CYA/viewform?usp=header" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#2C3E50] hover:bg-[#1A252F] text-white font-bold text-[18px] md:text-[20px] px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 no-underline inline-block"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
          >
            Start Pairing
          </a>
        </div>
      </div>
    </div>
  );
}

function SlideExampleSection() {
  return (
    <div 
      className="bg-[#f8f9fa] py-16" 
      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-medium text-black mb-4">
            Introduction Slide Example
          </h2>
          <p className="text-[18px] md:text-[20px] text-gray-700 max-w-3xl mx-auto">
            Here's an example of what your introduction slide could look like. Include information about yourself, your interests, and fun facts to help others get to know you!
          </p>
        </div>

        {/* Example Slide */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <img 
              src={exampleSlideImage} 
              alt="Example introduction slide for Terrence Li showing About Me section, photo, and Fun Facts"
              className="w-full h-auto object-contain"
            />
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
      <PairingSection />
      <SlideExampleSection />
      <div className="w-full">
        <EventsSection onNavigate={onNavigate} isMentorMentee={true} />
      </div>
      <Footer />
    </div>
  );
}