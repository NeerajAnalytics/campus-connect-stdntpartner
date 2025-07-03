
import React from "react";
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader";
import SeniorProfileFooter from "@/components/profile/SeniorProfileFooter";

const SeniorFormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#edf1f8] to-[#d6e3f0] font-['Poppins']">
      <SeniorProfileHeader />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] bg-clip-text text-transparent">
              Raise an Issue
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Help us address your concerns by providing detailed information about the issue you'd like to raise. Complete all sections of the form below.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] p-8">
              <h2 className="text-2xl font-semibold text-white text-center">
                Issue Report Form for Seniors
              </h2>
              <p className="text-blue-100 text-center mt-2">
                Please fill out all sections completely and accurately
              </p>
            </div>
            
            <div className="p-1 bg-gray-50">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSe7OIarVQZe7_uQ2TiJJQlWZ72uTlAt4rv5jM-4r00viXM3Wg/viewform?embedded=true"
                width="100%"
                height="1400"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Senior Issue Report Form"
                className="w-full rounded-lg bg-white"
                style={{ minHeight: '1400px' }}
              >
                Loading comprehensive form...
              </iframe>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-green-800 mb-4 text-xl flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Form Guidelines
              </h3>
              <div className="space-y-3 text-sm text-green-700">
                <p className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Fill out all required sections completely
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Provide accurate senior details and contact information
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Include specific incident information and timeline
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Upload relevant evidence or documentation when possible
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-blue-800 mb-4 text-xl flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                What Happens Next
              </h3>
              <div className="space-y-3 text-sm text-blue-700">
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Your report will be reviewed within 2-3 business days
                </p>
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  You'll receive a confirmation email with a case number
                </p>
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Our team will contact you for any additional information
                </p>
                <p className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  All information is kept strictly confidential
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 max-w-4xl mx-auto shadow-lg">
              <h3 className="font-bold text-amber-800 mb-3 text-lg">
                📞 Need Immediate Assistance?
              </h3>
              <p className="text-amber-700 text-sm">
                If this is an urgent matter requiring immediate attention, please contact our support team directly at{" "}
                <span className="font-semibold">support@campusconnect.edu</span> or call our helpline.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SeniorProfileFooter />
    </div>
  );
};

export default SeniorFormPage;
