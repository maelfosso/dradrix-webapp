export type UserType = {
  id: number,
  name: string,
  email: string,
  phone: string
}

export type SignInInputs = {
  username: string
  password: string
}

export type SignUpInputs = {
  firstName: string
  lastName: string
  sex: string
  email: string
  phone: string
  password: string
}
