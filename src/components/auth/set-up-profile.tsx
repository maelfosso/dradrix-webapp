import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AUTH_PROFILE, updateProfile, UpdateProfileRequest } from "@/api/onboarding";
import { useAuthContext } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePathUtils } from "@/lib/path";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Field, FieldGroup, Fieldset } from "../ui/fieldset";

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
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Please enter your information.
        </p>
      </div>
      <form className="p-4 mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
        <Fieldset>
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

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  )
}

export default SetUpProfile;
