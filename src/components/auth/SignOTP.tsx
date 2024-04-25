import OTPInputValidation from "components/auth/OTPInputValidation";
import useAuth from "hooks/useAuth";
import { SignOTPInputs } from "models/auth";
import { useState } from "react"
import { Link } from "react-router-dom"

const SignOTPage = () => {
  const [inputs, setInputs] = useState<SignOTPInputs>({
    phoneNumber: '',
    otp: ''
  });
  const [error, setSubmissionError] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const { signOTP } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOTP(inputs);
    // try {
    //   await signUp(inputs);
    //   router.replace(AUTH_SIGN_IN);
    // } catch (error) {
    //   setShowError(true);
    //   setSubmissionError(getErrorMessage(error))
    // }
  }

  const onCloseError = () => {
    setShowError(false);
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
        <h2 className='mt-6 text-3xl tracking-tight font-bold text-gray-900'>
            Create an account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link to="/auth/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign into your an account
            </Link>
            {' '} if you already have one
          </p>
          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
        </div>

        <OTPInputValidation numberOfDigits={4} />
      </div>
    </div>
  )
}

export default SignOTPage;
