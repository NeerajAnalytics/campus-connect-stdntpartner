
import React from "react";
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader";
import SeniorProfileFooter from "@/components/profile/SeniorProfileFooter";

const SeniorFormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      <SeniorProfileHeader />

      <main className="flex-grow py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Raise an Issue</h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe7OIarVQZe7_uQ2TiJJQlWZ72uTlAt4rv5jM-4r00viXM3Wg/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Senior Issue Report Form"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>

      <SeniorProfileFooter />
    </div>
  );
};

export default SeniorFormPage;
