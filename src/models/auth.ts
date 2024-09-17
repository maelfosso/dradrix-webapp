interface UserPreferences {
  organization: {
    id: string
    name: string
  }
  onboardingStep: number
}

export interface UserType {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  preferences: UserPreferences
}

export interface SignInInputs {
  phoneNumber: string
}

export interface SignOTPInputs{
  phoneNumber: string
  pinCode: string
}
