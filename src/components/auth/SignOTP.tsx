import { useMutation } from "@tanstack/react-query";
import { signOTP, SignOTPRequest } from "api/auth";
import { Button } from "components/common/Button";
import { Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Text } from "components/common/Text";
import { useAuthContext } from "contexts/AuthContext";
import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { usePathUtils } from "utils/path";

const NUMBER_OF_DIGITS = 4;

const SignOTP = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const [otp, setOtp] = useState<string[]>(new Array(NUMBER_OF_DIGITS).fill(""));
  const otpBoxReference = useRef([]);

  const handleChange = (value: string, index: number) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if(value && index < NUMBER_OF_DIGITS-1){
      otpBoxReference.current[index + 1].focus()
    }
  }

  const handleBackspaceAndEnter = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if(e.key === "Backspace" && !e.target.value && index > 0){
      otpBoxReference.current[index - 1].focus()
    }
    if(e.key === "Enter" && e.target.value && index < NUMBER_OF_DIGITS-1){
      otpBoxReference.current[index + 1].focus()
    }
  }

  useEffect(() => { 
    // if (otp.join("") !== "" && otp.join("") !== correctOTP) {
    //   setOtpError("❌ Wrong OTP Please Check Again")
    // } else {
    //   setOtpError(null)
    // }
    if (otp.join("").length === NUMBER_OF_DIGITS) {
      // handleSubmit({
      //   phoneNumber: '',
      //   pinCode: otp.join("")
      // });
    }
   }, [otp]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = {
      phoneNumber,
      pinCode: otp.join("")
    };

    try {
      const response = await mutateSignOTP(inputs);
      removeParameter("phone-number");
      navigate(response.redirectToUrl, {
        replace: true
      });
      checkCurrentUser();
    } catch (error) {
      
    }
  }

  return (
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Heading>Enter the OTP</Heading>
          <Text>Type the OTP you've received on WhatsApp</Text>
          <form className="mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
            <Fieldset>
              <div className='flex items-center justify-between space-x-2'>
                {otp.map((digit, index)=>(
                  <Input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e)=> handleChange(e.target.value, index)}
                    onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
                    ref={(reference) => (otpBoxReference.current[index] = reference)}
                    wrapperClassName="w-16 h-16"
                    className="text-center sm:text-3xl h-full"
                  />
                ))}
              </div>
            </Fieldset>

            <Button type="submit" className="w-full" color="dark/white">Submit</Button>
          </form>
        </div>
      </div>
  )
}

export default SignOTP;
