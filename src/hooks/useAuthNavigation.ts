
import { useNavigate } from "react-router-dom";

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const navigateAfterSignUp = (isSenior: boolean) => {
    if (isSenior) {
      navigate("/senior-login");
    } else {
      navigate("/junior-login");
    }
  };

  const navigateAfterSignIn = (userType?: 'junior' | 'senior', userData?: any) => {
    const hasCollegeId = userData?.college_id;
    
    if (userType === 'senior' || hasCollegeId) {
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
