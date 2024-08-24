import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { Badge } from "components/common/Badge"
import { Button } from "components/common/Button"
import { Divider } from "components/common/Divider"
import { Heading } from "components/common/Heading"
import { Link } from "components/common/Link"
import { DataFromActivity } from "components/data/DataFromActivity"
import { useActivityContext } from "contexts/ActivityContext"
import { useNavigate } from "react-router-dom"

export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}

export const ActivityHome = () => {
  const navigate = useNavigate();
  const { activity } = useActivityContext();

  if (!activity) {
    return <></>
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link to="" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4" />
          Activities
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{activity.name}</Heading>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline onClick={() => navigate('edit')}>Edit</Button>
        </div>
      </div>
      <DataFromActivity />
    </>
  )
}