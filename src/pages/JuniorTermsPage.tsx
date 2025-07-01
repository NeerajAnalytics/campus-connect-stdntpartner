import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const JuniorTermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      {/* Header/Navigation */}
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/connect-with-senior" className="text-gray-700 hover:text-gray-900">
                Connect With Senior
              </Link>
              <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-4 text-[#1a4e8a]">Terms & Conditions</h1>
          <p className="text-gray-600 mb-6">Last updated: 29-03-2025</p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">1. Acceptance of Terms:</h2>
              <p className="text-gray-700">
                By accessing or using this website (the "Site"), you agree to be bound by these Terms and Conditions (the "Terms"). 
                If you do not agree to these Terms, please do not use the Site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">2. Description of Service:</h2>
              <p className="text-gray-700">
                The Site is designed to connect incoming juniors with seniors from the same college. The purpose is to assist 
                juniors with admission procedures, acclimatization to local conditions, and to bridge the gap between differing 
                cultural or regional backgrounds.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">3. User Eligibility:</h2>
              <p className="text-gray-700">
                The Site is intended for users who are either incoming juniors or current seniors of the college.
                By registering or using the Site, you represent that you are of legal age to form a binding contract 
                under applicable law.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">4. User Obligations and Conduct:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                <li>
                  <span className="font-medium">Accuracy of Information:</span> You agree to provide accurate, current, 
                  and complete information during registration and when using the Site.
                </li>
                <li>
                  <span className="font-medium">Respectful Communication:</span> Users must interact respectfully. 
                  Harassment, abuse, or any form of misbehavior is strictly prohibited.
                </li>
                <li>
                  <span className="font-medium">Resolution of Disputes:</span> Any disputes between users 
                  (whether between juniors and seniors or vice versa) must be resolved between the parties involved. 
                  The Site does not mediate or resolve user disputes.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">5. Disclaimers:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                <li>
                  <span className="font-medium">Intermediary Role:</span> The Site acts solely as a platform to connect users. 
                  It does not guarantee the accuracy, quality, or reliability of information provided by either juniors or seniors.
                </li>
                <li>
                  <span className="font-medium">No Endorsement:</span> The Site does not endorse any user's advice or services, 
                  and any reliance on user-provided information is at your own risk.
                </li>
                <li>
                  <span className="font-medium">Behavior and Misconduct:</span> The Site is not liable for any actions, 
                  miscommunications, or misconduct that occur between users. All interactions and agreements are solely 
                  between the users involved.
                </li>
                <li>
                  <span className="font-medium">"As Is" Basis:</span> The Site is provided on an "as is" and "as available" 
                  basis without any warranties, express or implied.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">6. Limitation of Liability:</h2>
              <p className="text-gray-700">
                In no event shall the Site, its owners, operators, or affiliates be liable for any direct, indirect, 
                incidental, consequential, or punitive damages arising out of or related to your use of the Site, 
                including but not limited to user interactions and any misbehavior or misconduct by users.
                Users agree to assume full responsibility for any outcomes resulting from their use of the Site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">7. Indemnification:</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless the Site, its owners, officers, employees, and affiliates 
                from and against any claims, damages, liabilities, losses, or expenses (including legal fees) arising from 
                your use of the Site, your violation of these Terms, or your conduct while using the Site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">8. Modifications to the Terms:</h2>
              <p className="text-gray-700">
                The Site reserves the right to modify or update these Terms at any time without prior notice.
                Your continued use of the Site after any changes constitutes acceptance of the new Terms. 
                It is your responsibility to review these Terms periodically.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">9. Governing Law and Dispute Resolution:</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the law.
                No case against us will be valid in terms of your loss if you are using the website.
                Any disputes arising out of or in connection with these Terms shall be resolved exclusively in the courts.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">10. Termination:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                <li>
                  The Site reserves the right to terminate or suspend your access to the Site at its sole discretion, 
                  without notice, for conduct that violates these Terms or is harmful to other users or the Site's operations.
                </li>
                <li>
                  Termination does not relieve you of any obligations incurred prior to termination.
                </li>
                <li>
                  For not following any college code of conduct.
                </li>
                <li>
                  Site is not responsible if you suffer Ragging from your seniors, and in such cases we request you to report us 
                  and the college management and solve your issue according to it.
                </li>
                <li>
                  Site is not responsible for any actions taken on you by the college management for any of your misbehavior 
                  or any other problems you face in your college.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1a4e8a] mb-2">Contact Information:</h2>
              <p className="text-gray-700">
                For any questions or concerns about these Terms, please write us at
                <a href="mailto:stdntpartner@gmail.com" className="text-[#5c7bb5] hover:underline ml-1">
                  stdntpartner@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-auto">
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-[#5c7bb5] text-xl font-semibold">
              CampusConnect
            </Link>
            <div className="flex items-center gap-8 text-sm">
              <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/junior-faq" className="text-gray-700 hover:text-gray-900">
                FAQ's
              </Link>
              <Link to="/junior-terms" className="text-gray-700 hover:text-gray-900">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#7d9bd2] py-2 text-center text-black text-sm">
          <p>Copyright © Student Partner</p>
        </div>
      </footer>
    </div>
  );
};

export default JuniorTermsPage;
