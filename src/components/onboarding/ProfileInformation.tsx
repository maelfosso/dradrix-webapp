import { Field, FieldGroup, Fieldset, Label, Legend } from "components/common/Fieldset";
import { Input } from "components/common/Input";
import { Text } from "components/common/Text";
import { useOnboardingContext } from "pages/OnboardingPage";

const ProfileInformation = () => {
  const {
    profile,
    setProfile
  } = useOnboardingContext();

  return (
    <form method="#" className="mx-auto max-w-2xl">
      <Fieldset>
        <Legend>Profile information</Legend>
        <Text>Kindly, provide some information about you</Text>
        <FieldGroup>
          <Field>
            <Label>First name</Label>
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({...profile, firstName: e.target.value})}
            />
          </Field>
          <Field>
            <Label>Last name</Label>
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({...profile, lastName: e.target.value})}
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({...profile, email: e.target.value})}
            />
          </Field>
        </FieldGroup>
      </Fieldset>
    </form>
  )
}

export default ProfileInformation;
