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
      handleSubmit({
        phoneNumber: '',
        pinCode: otp.join("")
      });
    }
   }, [otp]);

  const handleSubmit = async (inputs: SignOTPInputs) => { // } (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // await signOTP(inputs);
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
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <div className="px-4 sm:px-0"> */}
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Enter <br />One Time Password (OTP)
        </h2>
      </div>

        {/* <OTPInputValidation NUMBER_OF_DIGITS={4} /> */}
        <article className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col items-center bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <p className="text-base mt-6 mb-4">Type the OTP you've received on WhatsApp</p>
          
            <div className='flex items-center gap-4'>
              {otp.map((digit, index)=>(
                <input key={index} value={digit} maxLength={1}  
                  onChange={(e)=> handleChange(e.target.value, index)}
                  onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
                  ref={(reference) => (otpBoxReference.current[index] = reference)}
                  className={`border text-center text-5xl w-20 h-20 p-3 rounded-md block focus:border-2 focus:outline-none appearance-none`}
                />
              ))}
            </div>

            <p className={`text-lg text-white mt-4 ${errorOnSignOTP ? 'error-show' : ''}`}>{errorOnSignOTP}</p>
          </div>
        </article>
      {/* </div> */}
    </div>
  )
}

export default SignOTPage;
