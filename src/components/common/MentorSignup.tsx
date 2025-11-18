import { useMobileDetection } from "@/hooks/useMobileDetection";

interface MentorSignupProps {
  title: string;
  formUrl: string;
  height: string;
  mobileHeight?: string;
}

export default function MentorSignup({ title, formUrl, height, mobileHeight }: MentorSignupProps) {
  const isMobile = useMobileDetection();
  const iframeHeight = isMobile && mobileHeight ? mobileHeight : height;

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-[960px]">
        {/* Simple Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Clean Form Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <iframe
            src={formUrl}
            title={`${title} Form`}
            className="w-full border-0 bg-white"
            style={{
              height: iframeHeight,
              borderRadius: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
