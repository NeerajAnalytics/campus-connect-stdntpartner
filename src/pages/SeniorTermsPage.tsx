import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const SeniorTermsPage: React.FC = () => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      {/* Header/Navigation */}
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/senior-profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
              <Button 
                variant="ghost"
                className="text-gray-700 hover:text-gray-900" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 mb-6">Last updated: 20-04-2025</p>
          
          <div className="bg-white rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms:</h2>
              <p className="text-gray-700">
                By accessing or using this website (the "Site"), you agree to be bound by these Terms and Conditions (the "Terms"). If you do not agree to these Terms, please do not use the Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service:</h2>
              <p className="text-gray-700">
                The Site is designed to connect incoming juniors with seniors from the same college. The purpose is to assist juniors with admission procedures, acclimatization to local conditions, and to bridge the gap between differing cultural or regional backgrounds.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">3. User Eligibility:</h2>
              <p className="text-gray-700 mb-2">
                The Site is intended for users who are either incoming juniors or current seniors of the college.
              </p>
              <p className="text-gray-700">
                By registering or using the Site, you represent that you are of legal age to form a binding contract under applicable law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">4. User Obligations and Conduct:</h2>
              <p className="text-gray-700 mb-2">
                <strong>Accuracy of Information:</strong> You agree to provide accurate, current, and complete information during registration and when using the Site.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Respectful Communication:</strong> Users must interact respectfully. Harassment, abuse, or any form of misbehavior is strictly prohibited.
              </p>
              <p className="text-gray-700">
                <strong>Resolution of Disputes:</strong> Any disputes between users (whether between juniors and seniors or vice versa) must be resolved between the parties involved. The Site does not mediate or resolve user disputes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">5. Disclaimers:</h2>
              <p className="text-gray-700 mb-2">
                <strong>Intermediary Role:</strong> The Site acts solely as a platform to connect users. It does not guarantee the accuracy, quality, or reliability of information provided by either juniors or seniors.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>No Endorsement:</strong> The Site does not endorse any user's advice or services, and any reliance on user-provided information is at your own risk.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Behavior and Misconduct:</strong> The Site is not liable for any actions, miscommunications, or misconduct that occur between users. All interactions and agreements are solely between the users involved.
              </p>
              <p className="text-gray-700">
                <strong>"As Is" Basis:</strong> The Site is provided on an "as is" and "as available" basis without any warranties, express or implied.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability:</h2>
              <p className="text-gray-700 mb-2">
                In no event shall the Site, its owners, operators, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of the Site, including but not limited to user interactions and any misbehavior or misconduct by users.
              </p>
              <p className="text-gray-700">
                Users agree to assume full responsibility for any outcomes resulting from their use of the Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">7. Indemnification:</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless the Site, its owners, officers, employees, and affiliates from and against any claims, damages, liabilities, losses, or expenses (including legal fees) arising from your use of the Site, your violation of these Terms, or your conduct while using the Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">8. Modifications to the Terms:</h2>
              <p className="text-gray-700 mb-2">
                The Site reserves the right to modify or update these Terms at any time without prior notice.
              </p>
              <p className="text-gray-700">
                Your continued use of the Site after any changes constitutes acceptance of the new Terms. It is your responsibility to review these Terms periodically.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">9. Governing Law and Dispute Resolution:</h2>
              <p className="text-gray-700 mb-2">
                These Terms shall be governed by and construed in accordance with the law.
              </p>
              <p className="text-gray-700 mb-2">
                No case against us will be valid in terms of your loss if you are using the website.
              </p>
              <p className="text-gray-700">
                Any disputes arising out of or in connection with these Terms shall be resolved exclusively in the courts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">10. Termination:</h2>
              <p className="text-gray-700 mb-2">
                The Site reserves the right to terminate or suspend your access to the Site at its sole discretion, without notice, for conduct that violates these Terms or is harmful to other users or the Site's operations.
              </p>
              <p className="text-gray-700 mb-4">
                Termination does not relieve you of any obligations incurred prior to termination.
              </p>
              <p className="text-gray-700 mb-2">
                Seniors must follow the College code of conduct for Anti-Ragging. If any any junior files Anti-Ragging charges against the seniors, this site is not at all responsible and the individual is responsible for it, and you are responsible for any fine/penalty that is laid on you from the College Management. Not following the Anti-Ragging rules, will terminate you from the site.
              </p>
              <p className="text-gray-700">
                If any report/issue raised on you by your juniors is related to College is eligible for transfer to College Management.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Contact Information:</h2>
              <p className="text-gray-700">
                For any questions or concerns about these Terms, please write us at<br />
                <strong>stdntpartner@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-auto">
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/senior-home" className="text-[#5c7bb5] text-xl font-semibold">
              CampusConnect
            </Link>
            <div className="flex items-center gap-8 text-sm">
              <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/senior-faq" className="text-gray-700 hover:text-gray-900">
                FAQ's
              </Link>
              <Link to="/senior-terms" className="text-gray-700 hover:text-gray-900">
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

export default SeniorTermsPage;
