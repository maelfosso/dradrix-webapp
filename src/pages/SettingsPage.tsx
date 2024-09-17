import { Heading } from '@/components/common/Heading';
import { Link } from '@/components/common/Link';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from 'lib/utils'

const tabs = [
  { name: 'Organization', href: 'organization', current: true },
  { name: 'Team', href: 'team', current: false },
  // { name: 'Interview', href: '#', count: '4', current: true },
  // { name: 'Offer', href: '#', current: false },
  // { name: 'Disqualified', href: '#', current: false },
]

const SettingsPage = () => {
  const { pathname } = useLocation();

  return (
    <div  className="max-w-4xl">
      <Heading>Settings</Heading>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            defaultValue={tabs.find((tab) => tab.current)?.name}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.href}
                  aria-current={tab.current ? 'page' : undefined}
                  className={cn(
                    pathname.endsWith(tab.href)
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                    'flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                >
                  {tab.name}
                  {/* {tab.count ? (
                    <span
                      className={cn(
                        tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                        'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block',
                      )}
                    >
                      {tab.count}
                    </span>
                  ) : null} */}
                </Link>
              ))}
            </nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage;
