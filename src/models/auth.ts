type UserPreferences = {
  currentOrganizationId: string;
  // }{
  //   id: string
  //   name: string
  currentStatus: string;
}

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  preferences: UserPreferences
}
