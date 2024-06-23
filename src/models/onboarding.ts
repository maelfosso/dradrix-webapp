export type Profile = {
  firstName: string
  lastName: string
  email: string
}

export type Address = {
  street: string
  city: string
  region: string
  postalCode: string
  country: string
}

export type Organization = {
  name: string
  bio: string
  email: string
  address: Address
}

export type OnboardingStep = {
  id: string;
  title: string;
  component: React.JSX.Element;
}

export type OnboardingContextType = {
  profile: Profile;
  setProfile: (newProfile: Profile) => void;
  organization: Organization;
  setOrganization: (newOrganization: Organization) => void;
  error: string;
  stepIndex: number;
  currentStep: OnboardingStep;
  handlePrevious: () => void;
  handleNext: () => void;
  routingId: string | undefined;
}
