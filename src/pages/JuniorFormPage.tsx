
import React from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileFooter from "@/components/profile/ProfileFooter";

const JuniorFormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#edf1f8] to-[#d6e3f0] font-['Poppins']">
      <ProfileHeader />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] bg-clip-text text-transparent">
              Report an Issue
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help you resolve any issues you're facing. Please fill out the form below with detailed information.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] p-6">
              <h2 className="text-xl font-semibold text-white text-center">
                Issue Report Form for Juniors
              </h2>
            </div>
            
            <div className="p-2">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfoTge0of1wrZTTbVaoc2CTh7uqQSv3q3-LALT-wUriftj_QA/viewform?embedded=true"
                width="100%"
                height="1200"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Junior Issue Report Form"
                className="w-full rounded-lg"
                style={{ minHeight: '1200px' }}
              >
                Loading form...
              </iframe>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-3xl mx-auto">
              <h3 className="font-semibold text-blue-800 mb-3 text-lg">Important Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="space-y-2">
                  <p>• Provide detailed information about your issue</p>
                  <p>• Include relevant contact details</p>
                  <p>• Be specific about the incident</p>
                </div>
                <div className="space-y-2">
                  <p>• Upload supporting documents if available</p>
                  <p>• All information will be kept confidential</p>
                  <p>• You'll receive a response within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProfileFooter />
    </div>
  );
};

export default JuniorFormPage;
