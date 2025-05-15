
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { getProfiles } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Profile } from "@/types/database";

const JuniorProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      // Use type-safe helper function
      const { data, error } = await getProfiles()
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data as Profile);
    } catch (error: any) {
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c7bb5]"></div>
      </div>
    );
  }

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
              <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
                Accommodation
              </Link>
              <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <hr className="border-gray-300 mb-6" />
          
          <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
              <Avatar className="w-full h-full">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-gray-300 text-gray-600 text-4xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-gray-700">
                For the Profile it directly takes from Mail, and the Name is beside it.
              </p>
            </div>
          </div>
          
          <div className="space-y-6 mb-6">
            <div>
              <h3 className="font-semibold mb-1">Name</h3>
              <p className="text-gray-800">{profile?.name || 'Not set'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">G Mail</h3>
              <p className="text-gray-800">{user?.email}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Gender</h3>
              <p className="text-gray-800">{profile?.gender || 'Not set'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Password</h3>
              <p className="text-gray-800">••••••••</p>
            </div>
          </div>
          
          <hr className="border-gray-300 mb-6" />
          
          <div className="flex justify-between">
            <Button
              variant="secondary"
              className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md"
              onClick={() => navigate('/junior-report')}
            >
              Report an Issue
            </Button>
            
            <Button
              variant="secondary"
              className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md"
              onClick={() => navigate('/junior-edit')}
            >
              Edit
            </Button>
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
              <Link to="/terms" className="text-gray-700 hover:text-gray-900">
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

export default JuniorProfilePage;
