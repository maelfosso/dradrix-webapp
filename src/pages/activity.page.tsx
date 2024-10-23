import * as React from 'react';
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { useActivityContext } from "@/contexts/activity.context"
import { useMemo } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { EditInput } from '@/components/edit-activity/edit-input';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/components/ui/link';
import { Badge } from '@/components/ui/badge';

export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div>
      <Separator />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}

const navigation = [
  { name: "Fields", href: "edit", current: true },
  { name: "Data", href: "data", current: false },
  { name: "Settings", href: "settings", current: false }
]

export const ActivityPage = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const [editName, setEditName] = React.useState(false);

  const goBackURL = useMemo(() => {
    return pathname.split("/").slice(0, -1).join("/")
  }, [pathname])

  const { activity, setActivity, handleSetUpdate } = useActivityContext();

  if (!activity) {
    return <></>
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link to={"/x/activities"} className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4" />
          Activities
        </Link>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <header className="pb-4 pt-6 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap sm:pr-6 lg:pr-8">
              <EditInput
                value={activity.name}
                placeholder="Name your activity here"
                setValue={(newValue) => setActivity({ ...activity, name: newValue })}
                onEnter={() => handleSetUpdate('name', activity.name)}
                className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white"
              />
              <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                {navigation.map((item) => (
                  <Link
                    key={`activity-home-${item.name}`}
                    to={item.href}
                    className={cn(
                      'text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white',
                      pathname.endsWith(item.href) && 'border-b-zinc-950 border-b-2'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </header>
        </div>
        {/* <div className="flex gap-4">
          <Button outline onClick={() => navigate('edit')}>Edit</Button>
        </div> */}
      </div>
      {/* <DataFromActivity /> */}
      <Outlet />
    </>
  )
}