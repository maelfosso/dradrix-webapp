import { Outlet, useNavigate } from "react-router-dom"
import AppNavbar from "./AppNavbar"
import { useAuthContext } from "contexts/AuthContext";
import { useEffect } from "react";
import HomeLayout from "./HomeLayout";
import Spinner from "./common/Spinner";

const AppContent = () => {

  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser?.preferences.onboardingStep != -1) {
      navigate("/onboarding");
    } else {
      navigate(`/c/${currentUser.preferences.organization.id}`)
    }
  }, [currentUser])

  console.log('[AppContent] rendering decision', currentUser?.preferences.onboardingStep, currentUser?.preferences.onboardingStep === -1);

  if (!currentUser) {
    console.log('Not current user present')
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    )
  }

  if (currentUser?.preferences.onboardingStep != -1) {
    return <NotReadyUserLayout />
  }

  return <HomeLayout />;
}

export default AppContent;

const NotReadyUserLayout = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  )
}
