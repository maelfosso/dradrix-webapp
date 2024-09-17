interface UserPreferences {
  currentOrganizationId: string;
  currentStatus: string;
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  preferences: UserPreferences
}
