import { SignInRequest } from "api/auth";
import { Button } from "components/common/Button";
import { Field, Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Text } from "components/common/Text";
import { useAuthContext } from "contexts/AuthContext";
import { useState } from "react";

const InviteSignUp = () => {
  // const {
  //   authenticationStep,
  //   handleSignIn,
  //   handleSignOTP,
  //   error,
  //   isAuthenticated,
  //   authenticatedUser
  // } = useAuthContext();
  
  const [inputs, setInputs] = useState<SignInRequest>({
    phoneNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // onSignIn(inputs);
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh_-_60px)] py-12 sm:px-6 lg:px-8">
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
    </div>
  )
}

export default InviteSignUp;
