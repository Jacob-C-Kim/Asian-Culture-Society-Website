import { useMobileDetection } from "../hooks/useMobileDetection";

export default function MentorSignup() {
  const isMobile = useMobileDetection();

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-[960px]">
        {/* Simple Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Become a Mentor</h1>
        </div>

        {/* Clean Form Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdYUoB1zb_teJ_6yBaE_AfGZ2onxZtRt_GcCyKaseoZhTKTeA/viewform?embedded=true"
            title="Mentor Sign Up Form"
            className="w-full border-0 bg-white"
            style={{
              height: isMobile ? "700px" : "900px",
              borderRadius: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
