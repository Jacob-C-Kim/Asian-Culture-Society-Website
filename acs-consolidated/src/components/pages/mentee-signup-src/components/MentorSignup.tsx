import { useMobileDetection } from "../hooks/useMobileDetection";

export default function MentorSignup() {
  const isMobile = useMobileDetection();

  return (
    <div className="py-12 px-4">
      <div className="max-w-[960px] mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Become a Mentee</h1>
        </div>

        {/* Clean Form Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScoyiQV_rEM-eum6JgXbHiHT6DaE1tFaleRNratqJscwrkJ1Q/viewform?embedded=true"
            title="Mentee Sign Up Form"
            className="w-full border-0 bg-white"
            style={{ 
              height: isMobile ? '1567px' : '1567px',
              borderRadius: '1rem'
            }}
          />
        </div>
      </div>
    </div>
  );
}