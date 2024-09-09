type UserPreferences = {
  organization: {
    id: string
    name: string
  }
  onboardingStep: number
}

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  preferences: UserPreferences
}

export type SignInInputs = {
  phoneNumber: string
}

export type SignOTPInputs = {
  phoneNumber: string
  pinCode: string
}
