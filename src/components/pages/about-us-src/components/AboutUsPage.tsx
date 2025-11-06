export default function AboutUsPage() {
  return (
    <div className="bg-[#99E3ED] relative min-h-screen w-full flex items-center justify-center" data-name="About us">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center w-full max-w-5xl mx-auto px-8">
        <div className="flex items-center gap-16">
          {/* Left side - Text content */}
          <div className="flex flex-col items-start">
            {/* About Us Header */}
            <div className="mb-8" data-name="about us">
              <div className="font-['Lexend:Bold',_sans-serif] font-bold text-[25px] text-black">
                <p className="leading-[normal]">about us</p>
              </div>
              <div className="w-full h-[1px] bg-[#195259] mt-2"></div>
            </div>
            
            {/* Main Description Text */}
            <div className="max-w-[425px]">
              <div className="font-['Lexend:Regular',_sans-serif] font-normal text-[#23464b] text-[18px]">
                <p className="leading-[1.4]">Asian Culture Society is the largest student organization at RIT, bringing together students who enjoy learning and sharing the history, culture, and art of Asian countries. We foster a welcoming community and create a space for anyone interested in Asian culture to connect, learn, and celebrate together. Along with our weekly activities, we host some of the biggest cultural events on campus, including our annual Night Market.</p>
              </div>
            </div>
          </div>
          
          {/* Right side - ACS Logo */}
          <div className="flex flex-col items-center">
            <div className="size-[194px] relative">
              <img
                src="/assets/logos/acs-logo-transparent.png"
                alt="Asian Culture Society Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center justify-center px-6 py-8 min-h-screen w-full">
        {/* About Us Header */}
        <div className="mb-8 text-center">
          <div className="font-['Lexend:Bold',_sans-serif] font-bold text-[28px] text-black">
            <p className="leading-[normal]">about us</p>
          </div>
          <div className="w-32 h-[1px] bg-[#195259] mt-2 mx-auto"></div>
        </div>
        
        {/* ACS Logo */}
        <div className="mb-8">
          <div className="size-[150px] relative">
            <img
              src="/assets/logos/acs-logo-transparent.png"
              alt="Asian Culture Society Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
        
        {/* Main Description Text */}
        <div className="text-center max-w-sm">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal text-[#23464b] text-[16px]">
            <p className="leading-[1.4]">Asian Culture Society is the largest student organization at RIT, bringing together students who enjoy learning and sharing the history, culture, and art of Asian countries. We foster a welcoming community and create a space for anyone interested in Asian culture to connect, learn, and celebrate together. Along with our weekly activities, we host some of the biggest cultural events on campus, including our annual Night Market.</p>
          </div>
        </div>
      </div>
    </div>
  );
}