import { useEffect, useRef, useState } from "react";

const correctOTP = "123456" // validate from your server

interface Props {
  numberOfDigits: number
}
const OTPInputValidation = ({ numberOfDigits = 4 }: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpBoxReference = useRef([]);

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if(value && index < numberOfDigits-1){
      otpBoxReference.current[index + 1].focus()
    }
  }

  function handleBackspaceAndEnter(e, index: number) {
    if(e.key === "Backspace" && !e.target.value && index > 0){
      otpBoxReference.current[index - 1].focus()
    }
    if(e.key === "Enter" && e.target.value && index < numberOfDigits-1){
      otpBoxReference.current[index + 1].focus()
    }
  }

  useEffect(() => { 
    if(otp.join("") !== "" && otp.join("") !== correctOTP){
      setOtpError("❌ Wrong OTP Please Check Again")
    }else{
      setOtpError(null)
    } 
   }, [otp]);

   return (
    <article className="w-1/2">
      <p className="text-base text-white mt-6 mb-4">One Time Password (OTP)</p>
     
     <div className='flex items-center gap-4'>
      {otp.map((digit, index)=>(
        <input key={index} value={digit} maxLength={1}  
        onChange={(e)=> handleChange(e.target.value, index)}
        onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
        ref={(reference) => (otpBoxReference.current[index] = reference)}
        className={`border w-20 h-auto text-white p-3 rounded-md block bg-black focus:border-2 focus:outline-none appearance-none`}
        />
      ))}

     </div>


      <p className={`text-lg text-white mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
    </article>
  );
}

export default OTPInputValidation;
