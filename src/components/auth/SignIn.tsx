import { AlertDanger } from "components/common/Alert";
import { Button } from "components/common/Button";
import { Field, Fieldset, Label } from "components/common/Fieldset";
import { Heading, Subheading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Link } from "components/common/Link";
import { SignInInputs } from "models/auth";
import React, { useState } from "react";

interface Props {
  onSignIn: (inputs: SignInInputs) => void;
  errorOnSignIn: string
}
const SignInPage = ({ errorOnSignIn, onSignIn } : Props) => {
  const [inputs, setInputs] = useState<SignInInputs>({
    phoneNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSignIn(inputs);
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Heading>Sign in to your account</Heading>
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            { errorOnSignIn && <AlertDanger description={errorOnSignIn} /> }
            <Fieldset className="mt-6">
              <Field>
                <Label>Your phone number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, phoneNumber: e.target.value})}
                  className="block w-full"
                  required
                />
              </Field>

            </Fieldset>

            <Button type="submit" className="w-full">Sign in</Button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SignInPage;
