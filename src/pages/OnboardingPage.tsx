import { Button } from "components/common/Button";
import Container from "components/common/Container";
import { Heading } from "components/common/Heading";
import { Navbar, NavbarSection, NavbarSpacer } from "components/common/Navbar";
import EndOfOnboarding from "components/onboarding/EndOfOnboarding";
import OrganizationInformation from "components/onboarding/OrganizationInformation";
import ProfileInformation from "components/onboarding/ProfileInformation";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { createContext, useContext, useMemo, useState } from "react";


const steps = [
  {
    id: "profile-information",
    title: "Profile information",
    component: <ProfileInformation />
  },
  {
    id: "organization-information",
    title: "Organization information",
    component: <OrganizationInformation />
  },
  {
    id: "thank-you",
    title: "Thank you",
    component: <EndOfOnboarding />
  }
]

export const OnboardingContext = createContext({
  profile: {
    firstName: '',
    lastName: '',
    email: ''
  },
  setProfile: () => {},
  organization: {
    name: '',
    bio: '',
    email: '',
    address: {}
  },
  setOrganization: () => {},
  stepIndex: 0,
  currentStep: {},
  handlePrevious: () => {},
  handleNext: () => {}
});

export const useOnboardingContext = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  
  const { currentUser } =  useCurrentUserContext();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [organization, setOrganization] = useState({
    name: '',
    bio: '',
    email: '',
    address: {}
  })
  const [stepIndex, setStepIndex] = useState(currentUser?.preferences.onboardingStep ?? 0)
  const currentStep = useMemo(() => {
    return steps[stepIndex];
  }, [stepIndex])

  const handlePrevious = () => {
    if (stepIndex <= 0) {
      return;
    }

    setStepIndex(stepIndex - 1);
  }

  const handleNext = () => {
    if (stepIndex >= steps.length - 1) {
      return;
    }

    switch (stepIndex) {
      case 0:
        console.log("profile step: ", profile)
        break;
    
      case 1:
        console.log("organization step: ", organization)
        break;

      case 2:
        console.log("last step")
        break;

      default:
        break;
    }

    setStepIndex(stepIndex + 1);
  }

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      organization,
      setOrganization,
      stepIndex,
      currentStep,
      handlePrevious,
      handleNext
    }),
    [
      profile,
      setProfile,
      organization,
      setOrganization,
      stepIndex,
      currentStep,
      handlePrevious,
      handleNext
    ]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

const OnboardingPage = () => {

  const {
    stepIndex,
    currentStep,
    handlePrevious,
    handleNext,
  } = useOnboardingContext();

  return (
    <Container className="w-969">
      {/* <div className="flex flex-col items-center justify-center h-[calc(100vh_-_60px)]"> */}
      <Heading>Onboarding</Heading>
      { currentStep.component }
      <Navbar>
        <Button
          plain 
          className={`${stepIndex <= 0 && 'hidden'}`}
          onClick={() => handlePrevious()}
        >Previous</Button>
        <NavbarSpacer />
        <NavbarSection>
          <p className="text-sm font-medium">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <ol role="list" className="ml-8 flex items-center space-x-5">
            {steps.map((step, index) => (
              <li key={step.id}>
                {index < stepIndex ? (
                  <div className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900">
                    <span className="sr-only">{step.title}</span>
                  </div>
                ) : stepIndex == index ? (
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
        </NavbarSection>
        <NavbarSpacer />
        <Button
          plain
          className={`${stepIndex >= steps.length - 1 && 'hidden'}`}
          onClick={() => handleNext()}
        >Next</Button>
      </Navbar>
  {/* </div> */}
    </Container>
  )
}

export default OnboardingPage;
