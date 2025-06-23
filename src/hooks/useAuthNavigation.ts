
import { useNavigate } from "react-router-dom";

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const navigateAfterSignUp = (isSenior: boolean) => {
    // After signup, redirect to login page based on user type
    if (isSenior) {
      navigate("/senior-login");
    } else {
      navigate("/junior-login");
    }
  };

  const navigateAfterSignIn = (userType?: 'junior' | 'senior', userData?: any) => {
    // Determine if user is senior based on metadata or userType
    const isSenior = userType === 'senior' || 
                    userData?.college_id || 
                    userData?.roll_no;
    
    if (isSenior) {
      navigate("/senior-home");
    } else {
      navigate("/junior-home");
    }
  };

  const navigateAfterSignOut = () => {
    navigate("/");
  };

  return {
    navigateAfterSignUp,
    navigateAfterSignIn,
    navigateAfterSignOut,
  };
};
