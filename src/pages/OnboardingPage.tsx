import EndOfOnboarding from "components/onboarding/EndOfOnboarding";
import FirstCompany from "components/onboarding/FirstCompany";
import UserDetails from "components/onboarding/UserDetails";

const steps = [
  {
    title: "Your informations",
    component: <UserDetails />
  },
  {
    title: "Your organization",
    component: <FirstCompany />
  },
  {
    title: "Thank you",
    component: <EndOfOnboarding />
  }
]

const OnboardingPage = () => {


  return (
    <></>
  )
}

export default OnboardingPage;
