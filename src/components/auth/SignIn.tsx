import { CommonAlertDanger } from "components/common/CommonAlert";
import { SignInInputs } from "models/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        {/* <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <Link to="/auth/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              create an account
          </Link>
          {' '} if you don&apos;t have one
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            { errorOnSignIn && <CommonAlertDanger description={errorOnSignIn} /> }
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Your phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  autoComplete="email"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, phoneNumber: e.target.value})}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
