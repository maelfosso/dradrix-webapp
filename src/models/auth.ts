export type UserType = {
  id: number,
  name: string,
  email: string,
  phone: string,

  currentOnboardingStep: number
}

export type SignInInputs = {
  phoneNumber: string
}

export type SignOTPInputs = {
  phoneNumber: string
  pinCode: string
}
