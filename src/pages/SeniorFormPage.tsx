
import React from "react";
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader";
import SeniorProfileFooter from "@/components/profile/SeniorProfileFooter";

const SeniorFormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#edf1f8] to-[#d6e3f0] font-['Poppins']">
      <SeniorProfileHeader />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] bg-clip-text text-transparent">
              Raise an Issue
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help us address your concerns by providing detailed information about the issue you'd like to raise.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#5c7bb5] to-[#7d9bd2] p-6">
              <h2 className="text-xl font-semibold text-white text-center">
                Issue Report Form for Seniors
              </h2>
            </div>
            
            <div className="p-2">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSe7OIarVQZe7_uQ2TiJJQlWZ72uTlAt4rv5jM-4r00viXM3Wg/viewform?embedded=true"
                width="100%"
                height="1200"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Senior Issue Report Form"
                className="w-full rounded-lg"
                style={{ minHeight: '1200px' }}
              >
                Loading form...
              </iframe>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-3xl mx-auto">
              <h3 className="font-semibold text-green-800 mb-3 text-lg">Reporting Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                <div className="space-y-2">
                  <p>• Fill out all required sections completely</p>
                  <p>• Provide accurate senior details</p>
                  <p>• Include specific incident information</p>
                </div>
                <div className="space-y-2">
                  <p>• Attach relevant evidence when possible</p>
                  <p>• Maintain professionalism in descriptions</p>
                  <p>• Expect follow-up within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SeniorProfileFooter />
    </div>
  );
};

export default SeniorFormPage;
