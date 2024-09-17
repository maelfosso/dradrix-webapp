import * as React from "react"
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInRequest, SignInResponse } from "@/api/auth";
import { addMemberIntoTeam } from "@/api/team";
import { Input } from "@/components/common/Input";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "../common/Link";
import { Icons } from "../icons";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const SignIn = () => {
  const navigate = useNavigate();
  const { invitationToken = "" } = useParams() as { invitationToken: string };
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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
    setIsLoading(true);

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
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      {/* <Heading>Sign in to your account</Heading>
      <Text>Enter your phone number, please</Text> */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Phone number
              </Label>
              <Input
                id="tel"
                placeholder="699 00 11 22"
                type="tel"
                autoCapitalize="none"
                autoComplete="tel"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, phoneNumber: e.target.value})}
                required
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Phone number
            </Button>
          </div>
        </form>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button> */}
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default SignIn;
