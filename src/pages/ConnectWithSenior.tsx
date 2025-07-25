
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { getSeniorProfiles } from "@/integrations/supabase/client";
import { SeniorProfile } from "@/types/database";
import { toast } from "@/components/ui/use-toast";

const ConnectWithSenior: React.FC = () => {
  const [seniors, setSeniors] = useState<SeniorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeniors();
  }, []);

  const fetchSeniors = async () => {
    try {
      setLoading(true);
      console.log("Fetching seniors from database...");
      const { data, error } = await getSeniorProfiles()
        .select('*');

      if (error) throw error;
      
      console.log("Raw senior data from database:", data);
      setSeniors(data || []);
      console.log("Number of seniors found:", data?.length || 0);
    } catch (error: any) {
      console.error("Error fetching seniors:", error);
      toast({
        title: "Error fetching seniors",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
        <header className="bg-[#edf1f8] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/junior-home" className="text-[#5c7bb5] text-2xl font-semibold">
                CampusConnect
              </Link>
              
              <div className="flex items-center gap-8">
                <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/connect-with-senior" className="text-gray-700 hover:text-gray-900">
                  Connect With Senior
                </Link>
                <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
                  Accommodation
                </Link>
                <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c7bb5]"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/junior-home" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/connect-with-senior" className="text-gray-700 hover:text-gray-900">
                Connect With Senior
              </Link>
              <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
                Accommodation
              </Link>
              <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Connect with Seniors
          </h1>

          {seniors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No seniors available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seniors.map((senior) => (
                <div key={senior.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-[#5c7bb5] rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {senior.name || 'Name not provided'}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Roll No:</span>
                      <span className="text-gray-800">{senior.roll_no || senior.college_id || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Phone:</span>
                      <span className="text-gray-800">{senior.phone || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Email:</span>
                      <span className="text-gray-800 text-sm break-all">
                        {senior.email || senior.college_id || 'Not provided'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Region:</span>
                      <span className="text-gray-800">{senior.region || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  {(senior.email || senior.college_id) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a 
                        href={`mailto:${senior.email || senior.college_id}`}
                        className="w-full bg-[#7d9bd2] text-black py-2 px-4 rounded-md hover:bg-[#6b89c0] transition-colors inline-block text-center"
                      >
                        Contact Senior
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#edf1f8] border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-gray-800">How Can we Help ?</h3>
              <p className="text-gray-700">Contact us any time</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-700">
                +91 9704927248
                <br />
                +91 850093952
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Send Us a Message</h3>
              <p className="text-gray-700">stdntpartner@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Follow Us</h3>
            </div>
          </div>
        </div>
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/junior-home" className="text-[#5c7bb5] text-xl font-semibold">
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

export default ConnectWithSenior;
