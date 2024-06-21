import { Button } from "components/common/Button";
import { FieldGroup, Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Text } from "components/common/Text";
import { SignOTPInputs } from "models/auth";
import { useEffect, useRef, useState } from "react"

const NUMBER_OF_DIGITS = 4;

interface Props {
  onSignOTP: (inputs: SignOTPInputs) => void;
  errorOnSignOTP: string
}
const SignOTPage = ({ errorOnSignOTP, onSignOTP } : Props) => {
  const [inputs, setInputs] = useState<SignOTPInputs>({
    phoneNumber: '',
    otp: ''
  });
  // const [error, setSubmissionError] = useState<string>();
  // const [showError, setShowError] = useState<boolean>(false);
  // const { signOTP } = useAuth();

  const [otp, setOtp] = useState<string[]>(new Array(NUMBER_OF_DIGITS).fill(""));
  // const [errorOnSignOTP, setOtpError] = useState<string | null>(null);
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
    // await signOTP(inputs);
    const inputs = {
      phoneNumber: '',
      pinCode: otp.join("")
    };
    console.log('handle submit')
    onSignOTP(inputs);
    // try {
    //   await signUp(inputs);
    //   router.replace(AUTH_SIGN_IN);
    // } catch (error) {
    //   setShowError(true);
    //   setSubmissionError(getErrorMessage(error))
    // }
  }

  return (
    <div className="flex flex-col py-12 items-center justify-center h-[calc(100vh_-_60px)] sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Heading>Enter the OTP</Heading>
          <Text>Type the OTP you've received on WhatsApp</Text>
          <form className="mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
            <Fieldset>
              <FieldGroup className='flex items-center justify-between'>
                {otp.map((digit, index)=>(
                  <Input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e)=> handleChange(e.target.value, index)}
                    onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
                    ref={(reference) => (otpBoxReference.current[index] = reference)}
                    className="!text-center !text-3xl !m-0 !w-16 !h-16"
                  />
                ))}
              </FieldGroup>
            </Fieldset>

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignOTPage;
