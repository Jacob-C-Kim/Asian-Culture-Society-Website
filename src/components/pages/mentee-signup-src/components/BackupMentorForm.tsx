import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData, FormErrors, validateForm } from "../utils/formValidation";
import { YEAR_OPTIONS } from "../constants/formConstants";

export default function BackupMentorForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    major: "",
    year: "",
    mentorGoals: "",
    hobbies: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8bd4e0]">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Thank You!</h2>
        <p className="leading-relaxed text-gray-600">
          Your mentor sign up has been successfully submitted.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-10">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">Alternative Form</h2>
        <p className="mb-2 text-gray-600">
          If the Google Form above doesn't work, you can use this backup form.
        </p>
        <p className="text-sm text-gray-500">All fields are required</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* RIT Email */}
        <div>
          <Label htmlFor="email" className="mb-2 block font-medium text-gray-800">
            RIT Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="abc1234@rit.edu"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`h-12 rounded-xl border-2 bg-white px-4 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.email
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 hover:border-gray-300 focus:border-[#8bd4e0]"
            }`}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-2 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="mb-2 block font-medium text-gray-800">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`h-12 rounded-xl border-2 bg-white px-4 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.name
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 hover:border-gray-300 focus:border-[#8bd4e0]"
            }`}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-2 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Major */}
        <div>
          <Label htmlFor="major" className="mb-2 block font-medium text-gray-800">
            Major
          </Label>
          <Input
            id="major"
            type="text"
            value={formData.major}
            onChange={(e) => handleInputChange("major", e.target.value)}
            placeholder="e.g., Computer Science, Business, Engineering"
            aria-invalid={errors.major ? "true" : "false"}
            aria-describedby={errors.major ? "major-error" : undefined}
            className={`h-12 rounded-xl border-2 bg-white px-4 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.major
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 hover:border-gray-300 focus:border-[#8bd4e0]"
            }`}
          />
          {errors.major && (
            <p
              id="major-error"
              className="mt-2 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.major}
            </p>
          )}
        </div>

        {/* Year */}
        <div>
          <Label htmlFor="year" className="mb-2 block font-medium text-gray-800">
            Year
          </Label>
          <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
            <SelectTrigger
              aria-invalid={errors.year ? "true" : "false"}
              aria-describedby={errors.year ? "year-error" : undefined}
              className={`h-12 rounded-xl border-2 bg-white px-4 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
                errors.year
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-200 hover:border-gray-300 focus:border-[#8bd4e0]"
              }`}
            >
              <SelectValue placeholder="Select your year" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg">
              {YEAR_OPTIONS.map((year) => (
                <SelectItem
                  key={year}
                  value={year}
                  className="mx-1 cursor-pointer rounded-lg hover:bg-[#f0fafa] focus:bg-[#f0fafa]"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && (
            <p
              id="year-error"
              className="mt-2 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.year}
            </p>
          )}
        </div>

        {/* Mentor Goals */}
        <div>
          <Label htmlFor="mentorGoals" className="mb-2 block font-medium text-gray-800">
            What do you hope to get out of being a mentor?
          </Label>
          <Textarea
            id="mentorGoals"
            value={formData.mentorGoals}
            onChange={(e) => handleInputChange("mentorGoals", e.target.value)}
            placeholder="Share your goals and what you hope to achieve as a mentor..."
            rows={4}
            aria-invalid={errors.mentorGoals ? "true" : "false"}
            aria-describedby={errors.mentorGoals ? "mentorGoals-error" : undefined}
            className={`resize-none rounded-xl border-2 bg-white p-4 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.mentorGoals
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 hover:border-gray-300 focus:border-[#8bd4e0]"
            }`}
          />
          {errors.mentorGoals && (
            <p
              id="mentorGoals-error"
              className="mt-2 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.mentorGoals}
            </p>
          )}
        </div>

        {/* Hobbies */}
        <div>
          <Label htmlFor="hobbies" className="mb-2 block font-medium text-gray-800">
            What are some of your hobbies?
          </Label>
          <Textarea
            id="hobbies"
            value={formData.hobbies}
            onChange={(e) => handleInputChange("hobbies", e.target.value)}
            placeholder="Tell us about your interests and hobbies..."
            rows={4}
            aria-invalid={errors.hobbies ? "true" : "false"}
            aria-describedby={errors.hobbies ? "hobbies-error" : undefined}
            className={`resize-none rounded-xl border-2 bg-white p-4 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.hobbies
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-200 hover:border-gray-300 focus:border-[#8bd4e0]"
            }`}
          />
          {errors.hobbies && (
            <p
              id="hobbies-error"
              className="mt-2 flex items-center gap-1 text-sm text-red-600"
              role="alert"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.hobbies}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-[#8bd4e0] font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:bg-[#7bc7d3] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="h-5 w-5 animate-spin text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
