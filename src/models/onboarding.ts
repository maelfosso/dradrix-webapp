import { User } from "./auth"


export type Address = {
  street: string
  city: string
  region: string
  postalCode: string
  country: string
}

export type Organization = {
  id: string
  name: string
  bio: string
  email: string
  address: Address

  invitationToken: string
}

export type Member = {
  Id: string
  organizationId: string
  user: User

  invitedAt: Date
  answeredAt: Date
  deletedAt: Date

  status: string
  role: string
}

export type OnboardingStep = {
  id: string;
  title: string;
  component: React.JSX.Element;
}

