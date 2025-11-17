import { useMobileDetection } from "../hooks/useMobileDetection";

export default function MentorSignup() {
  const isMobile = useMobileDetection();

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-[960px]">
        {/* Simple Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Join Tinikling</h1>
        </div>

        {/* Clean Form Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScfquFwA6Ekz8o8byDmDJuO_3gkdRJg5oIF-mc5x-onRspdpg/viewform?embedded=true"
            title="Join Tinikling Form"
            className="w-full border-0 bg-white"
            style={{
              height: isMobile ? "1507px" : "1507px",
              borderRadius: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
