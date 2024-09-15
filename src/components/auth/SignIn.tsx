import { useMutation } from "@tanstack/react-query";
import { signIn, SignInRequest, SignInResponse } from "api/auth";
import { addMemberIntoTeam } from "api/team";
import { Button } from "components/common/Button";
import { Field, Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Text } from "components/common/Text";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { invitationToken = "" } = useParams() as { invitationToken: string };

  const { mutateAsync: mutateSignIn } = useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn:  (inputs: SignInRequest) => signIn(inputs)
  });

  const { mutateAsync: mutateAddMember } = useMutation({
    mutationKey: ["join", invitationToken],
    mutationFn:  (inputs: SignInRequest) => addMemberIntoTeam(inputs)
  });

  const [inputs, setInputs] = useState<SignInRequest>({
    phoneNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let response: SignInResponse
    e.preventDefault();

    try {
      if (invitationToken) {
        response = await mutateAddMember({...inputs, invitationToken })
      } else {
        response = await mutateSignIn(inputs);
      }
      navigate(response.redirectToUrl, {
        replace: true
      });
    } catch (error) {
      
    }
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <Heading>Sign in to your account</Heading>
        <Text>Enter your phone number, please</Text>
        <form className="mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
          <Fieldset>
            <Field>
              <Input
                id="phone_number"
                name="phone_number"
                placeholder="Your phone number"
                type="tel"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, phoneNumber: e.target.value})}
                required
              />
            </Field>
          </Fieldset>

          <Button type="submit" className="w-full" color="dark/white">Sign in</Button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
