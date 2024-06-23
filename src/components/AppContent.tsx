import { Outlet, useNavigate } from "react-router-dom"
import AppNavbar from "./AppNavbar"
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { useEffect } from "react";
import HomeLayout from "./HomeLayout";

const AppContent = () => {

  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (currentUser.preferences.onboardingStep != -1) {
      navigate("/onboarding");
    } else {
      navigate(`/c/${currentUser.preferences.organization.id}`)
    }
  }, [currentUser, navigate]);

  if (currentUser?.preferences.onboardingStep === -1) {
    return <HomeLayout />
  }

  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  )
}

export default AppContent;
