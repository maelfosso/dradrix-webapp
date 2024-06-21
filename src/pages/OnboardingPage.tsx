import { Navbar } from "components/common/Navbar";
import EndOfOnboarding from "components/onboarding/EndOfOnboarding";
import FirstCompany from "components/onboarding/FirstCompany";
import UserDetails from "components/onboarding/UserDetails";
import useCurrentUser from "hooks/useCurrentUser";
import { useMemo } from "react";

const steps = [
  {
    id: "profile-information",
    title: "Profile information",
    component: <UserDetails />
  },
  {
    id: "organization-information",
    title: "Organization information",
    component: <FirstCompany />
  },
  {
    id: "thank-you",
    title: "Thank you",
    component: <EndOfOnboarding />
  }
]

const OnboardingPage = () => {
  const { currentUser } =  useCurrentUser();
  const currentStep = useMemo(() => {
    return steps[currentUser!.currentOnboardingStep]
  }, [currentUser?.currentOnboardingStep])

  return (
    <>
      {/* <Navbar></Navbar> */}
      <nav className="flex items-center justify-center" aria-label="Progress">
        <p className="text-sm font-medium">
          Step {currentUser!.currentOnboardingStep + 1} of {steps.length}
        </p>
        <ol role="list" className="ml-8 flex items-center space-x-5">
          {steps.map((step, index) => (
            <li key={step.id}>
              {currentUser!.currentOnboardingStep < index ? (
                <div className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900">
                  <span className="sr-only">{step.title}</span>
                </div>
              ) : currentUser!.currentOnboardingStep == index ? (
                <div className="relative flex items-center justify-center" aria-current="step">
                  <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                    <span className="h-full w-full rounded-full bg-indigo-200" />
                  </span>
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
                  <span className="sr-only">{step.title}</span>
                </div>
              ) : (
                <div className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                  <span className="sr-only">{step.title}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default OnboardingPage;
