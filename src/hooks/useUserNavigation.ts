
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const useUserNavigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigateToHome = () => {
    if (!user) {
      navigate("/");
      return;
    }

    // Check if user is a senior based on metadata
    const isSenior = user.user_metadata?.college_id || user.user_metadata?.roll_no;
    
    if (isSenior) {
      navigate("/senior-home");
    } else {
      navigate("/junior-home");
    }
  };

  const getCurrentHomeRoute = () => {
    if (!user) return "/";
    
    const isSenior = user.user_metadata?.college_id || user.user_metadata?.roll_no;
    return isSenior ? "/senior-home" : "/junior-home";
  };

  return {
    navigateToHome,
    getCurrentHomeRoute,
    isLoggedIn: !!user,
    isSenior: !!(user?.user_metadata?.college_id || user?.user_metadata?.roll_no)
  };
};
