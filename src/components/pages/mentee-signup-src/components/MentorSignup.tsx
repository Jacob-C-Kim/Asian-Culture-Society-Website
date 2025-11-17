import { useMobileDetection } from "@/hooks/useMobileDetection";

export default function MentorSignup() {
  const isMobile = useMobileDetection();

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-[960px]">
        {/* Simple Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Become a Mentee</h1>
        </div>

        {/* Clean Form Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScoyiQV_rEM-eum6JgXbHiHT6DaE1tFaleRNratqJscwrkJ1Q/viewform?embedded=true"
            title="Mentee Sign Up Form"
            className="w-full border-0 bg-white"
            style={{
              height: isMobile ? "1567px" : "1567px",
              borderRadius: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
