
import React from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileFooter from "@/components/profile/ProfileFooter";

const JuniorFormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      <ProfileHeader />

      <main className="flex-grow py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Report an Issue</h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfxvKmY8xJqGqQZxQqQzQqQzQqQzQqQzQqQzQqQzQqQzQqQzA/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Junior Issue Report Form"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>

      <ProfileFooter />
    </div>
  );
};

export default JuniorFormPage;
