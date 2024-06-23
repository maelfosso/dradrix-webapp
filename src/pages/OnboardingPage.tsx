import { useMutation } from "@tanstack/react-query";
import { OrganizationMutationResponse, setOrganizationMutation, setProfileMutation } from "api/onboarding";
import { Button } from "components/common/Button";
import Container from "components/common/Container";
import { Heading } from "components/common/Heading";
import { Navbar, NavbarSection, NavbarSpacer } from "components/common/Navbar";
import EndOfOnboarding from "components/onboarding/EndOfOnboarding";
import OrganizationInformation from "components/onboarding/OrganizationInformation";
import ProfileInformation from "components/onboarding/ProfileInformation";
import { useAuthContext } from "contexts/AuthContext";
import { createContext, useContext, useMemo, useState } from "react";
import { OnboardingContextType, Profile, Organization } from "models/onboarding";


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

export const OnboardingContext = createContext<OnboardingContextType>({
  profile: {
    firstName: '',
    lastName: '',
    email: ''
  },
  setProfile: () => undefined,
  organization: {
    name: '',
    bio: '',
    email: '',
    address: {
      street: '',
      city: '',
      region: '',
      postalCode: '',
      country: ''
    },
  },
  setOrganization: () => undefined,
  error: '',
  stepIndex: 0,
  currentStep: steps[0],
  handlePrevious: () => {},
  handleNext: () => {},
  routingId: undefined
});

export const useOnboardingContext = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  
  const { currentUser } =  useAuthContext();

  const [profile, setProfile] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || ''
  });
  const [organization, setOrganization] = useState({
    name: '',
    bio: '',
    email: '',
    address: {
      street: '',
      city: '',
      region: '',
      postalCode: '',
      country: ''
    }
  })
  const [error, setError] = useState('');
  const [stepIndex, setStepIndex] = useState(currentUser?.preferences.onboardingStep ?? 0)
  const currentStep = useMemo(() => {
    return steps[stepIndex];
  }, [stepIndex])
  const [routingId, setRoutingId] = useState<string|undefined>(undefined);

  const { mutate: mutateProfile } = useMutation(setProfileMutation({
    onSuccess: (done: boolean) => {
      setStepIndex(stepIndex + 1);
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  }));

  const { mutate: mutateOrganization } = useMutation(setOrganizationMutation({
    onSuccess: (response: OrganizationMutationResponse) => {
      setStepIndex(stepIndex + 1);
      setRoutingId(response.id);
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  }));

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
        mutateProfile(profile);
        break;
    
      case 1:
        mutateOrganization(organization);
        break;

      case 2:
        break;

      default:
        break;
    }
  }

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      organization,
      setOrganization,
      error,
      stepIndex,
      currentStep,
      handlePrevious,
      handleNext,
      routingId
    }),
    [
      profile,
      setProfile,
      organization,
      setOrganization,
      error,
      stepIndex,
      currentStep,
      handlePrevious,
      handleNext,
      routingId
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
    <Container>
      { stepIndex < steps.length - 1 && <Heading>Onboarding</Heading>}
      { currentStep.component }
      { stepIndex < steps.length - 1 && (
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
      )}
    </Container>
  )
}

export default OnboardingPage;
