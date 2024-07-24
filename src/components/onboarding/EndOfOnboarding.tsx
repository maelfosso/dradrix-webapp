import { Link } from "components/common/Link";
import { useOnboardingContext } from "pages/OnboardingPage";

const EndOfOnboarding = () => {
  const {
    routingId
  } = useOnboardingContext();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Thank you
          <br />
          for initializing your account
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Link
            to={`/org/${routingId}/`}
            replace
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EndOfOnboarding;
