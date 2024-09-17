import { useMutation } from "@tanstack/react-query";
import { AUTH_PROFILE, updateProfile, UpdateProfileRequest } from "@/api/onboarding";
import { Button } from "@/components/common/Button";
import { Field, FieldGroup, Fieldset, Label } from "@/components/common/Fieldset";
import { Heading } from "@/components/common/Heading";
import { Input } from "@/components/common/Input";
import { Text } from "@/components/common/Text";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePathUtils } from "@/lib/path";

const SetUpProfile = () => {
  const navigate = useNavigate();
  const { authenticatedUser } =  useAuthContext();

  const [profile, setProfile] = useState<UpdateProfileRequest>({
    firstName: authenticatedUser?.firstName || '',
    lastName: authenticatedUser?.lastName || '',
    email: authenticatedUser?.email || '',
    phoneNumber: ''
  });

  const { findParameter, removeParameter } = usePathUtils();
  useEffect(() => {
    const phoneNumber = findParameter("phone-number");
    setProfile({
      ...profile,
      phoneNumber
    });
  }, [findParameter])


  const { mutateAsync: mutateProfile } = useMutation({
    mutationKey: [AUTH_PROFILE, authenticatedUser?.id],
    mutationFn:  (inputs: UpdateProfileRequest) => updateProfile(inputs)
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await mutateProfile(profile);
      removeParameter('phone-number');
      navigate(response.redirectToUrl, {
        replace: true
      });
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Heading>Create your profile</Heading>
          <Text>Kindly, provide some information about you</Text>
          <form className="mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
            <Fieldset>
              {/* <Legend>Profile information</Legend> */}
              {/* <Text>Kindly, provide some information about you</Text> */}
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

            <Button type="submit" className="w-full" color="dark/white">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SetUpProfile;
