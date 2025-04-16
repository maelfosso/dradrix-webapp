import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { signOTP, SignOTPRequest } from "@/api/auth"
import { useAuthContext } from "@/contexts/auth.context";
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { usePathUtils } from "@/lib/path";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const NUMBER_OF_DIGITS = 4;

const SignOTP = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const requestSource = useMemo(() => {
    const splitten = pathname.split("/");
    return splitten.slice(0, splitten.length - 1).join("/")
  }, [pathname]);

  const { checkCurrentUser } = useAuthContext();
  const { mutateAsync: mutateSignOTP } = useMutation({
    mutationKey: ["auth", "sign-otp"],
    mutationFn:  (inputs: SignOTPRequest) => signOTP(inputs, { from: requestSource })
  });

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  const { findParameter, removeParameter } = usePathUtils();

  useEffect(() => {
    const phoneNumber = findParameter("phone-number");
    setPhoneNumber(phoneNumber);
  }, [findParameter])

  const [otp, setOtp] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = {
      phoneNumber,
      pinCode: otp,
    };

    setIsLoading(true);
    try {
      const response = await mutateSignOTP(inputs);
      removeParameter("phone-number");
      navigate(response.redirectToUrl, {
        replace: true
      });
      checkCurrentUser();
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          One-Time-Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Please enter the one-time password sent to your phone.
        </p>
      </div>
      <div className="p-4 grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="otp">
                One-Time Password
              </Label>
              <InputOTP maxLength={NUMBER_OF_DIGITS} onChange={(e) => setOtp(e)}>
                <InputOTPGroup className="w-full">
                  <InputOTPSlot index={0} className="h-20 sm:text-4xl" />
                  <InputOTPSlot index={1} className="h-20 sm:text-4xl" />
                  <InputOTPSlot index={2} className="h-20 sm:text-4xl" />
                  <InputOTPSlot index={3} className="h-20 sm:text-4xl" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit the one-time password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignOTP;
