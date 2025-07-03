
import React from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileFooter from "@/components/profile/ProfileFooter";

const JuniorFormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#edf1f8] to-[#d6e3f0] font-['Poppins']">
      <ProfileHeader />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] bg-clip-text text-transparent">
              Report an Issue
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're here to help you resolve any issues you're facing. Please fill out the complete form below with detailed information about your situation.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] p-8">
              <h2 className="text-2xl font-semibold text-white text-center">
                Issue Report Form for Juniors
              </h2>
              <p className="text-blue-100 text-center mt-2">
                Complete all sections to ensure we can help you effectively
              </p>
            </div>
            
            <div className="p-1 bg-gray-50">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfoTge0of1wrZTTbVaoc2CTh7uqQSv3q3-LALT-wUriftj_QA/viewform?embedded=true"
                width="100%"
                height="1400"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Junior Issue Report Form"
                className="w-full rounded-lg bg-white"
                style={{ minHeight: '1400px' }}
              >
                Loading comprehensive form...
              </iframe>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-purple-800 mb-4 text-xl flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Reporting Guidelines
              </h3>
              <div className="space-y-3 text-sm text-purple-700">
                <p className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  Provide detailed information about your issue
                </p>
                <p className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  Include relevant contact details and personal information
                </p>
                <p className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  Be specific about the incident and circumstances
                </p>
                <p className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  Upload supporting documents or evidence if available
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-teal-800 mb-4 text-xl flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Support Process
              </h3>
              <div className="space-y-3 text-sm text-teal-700">
                <p className="flex items-start">
                  <span className="text-teal-500 mr-2 mt-1">•</span>
                  You'll receive a response within 24-48 hours
                </p>
                <p className="flex items-start">
                  <span className="text-teal-500 mr-2 mt-1">•</span>
                  All information will be kept completely confidential
                </p>
                <p className="flex items-start">
                  <span className="text-teal-500 mr-2 mt-1">•</span>
                  Our support team will guide you through next steps
                </p>
                <p className="flex items-start">
                  <span className="text-teal-500 mr-2 mt-1">•</span>
                  Follow-up support is available throughout the process
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-6 max-w-4xl mx-auto shadow-lg">
              <h3 className="font-bold text-rose-800 mb-3 text-lg">
                🆘 Emergency Support
              </h3>
              <p className="text-rose-700 text-sm">
                If you're facing an emergency or urgent situation, please don't wait for the form response.{" "}
                Contact our emergency helpline immediately at <span className="font-semibold">1-800-HELP-NOW</span>{" "}
                or reach out to campus security.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ProfileFooter />
    </div>
  );
};

export default JuniorFormPage;
