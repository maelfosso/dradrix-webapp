import { ArrowsPointingOutIcon, ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { Badge } from "components/common/Badge"
import { Button } from "components/common/Button"
import { Divider } from "components/common/Divider"
import { Heading, Subheading } from "components/common/Heading"
import { Link } from "components/common/Link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/common/Table"
import { useActivityContext } from "contexts/ActivityContext"

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
  const { activity } = useActivityContext();

  if (!activity) {
    return <></>
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4" />
          Activities
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          {/* <div className="w-32 shrink-0">
            <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt="" />
          </div> */}
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{activity.name}</Heading>
              {/* <Badge color={event.status === 'On Sale' ? 'lime' : 'zinc'}>{event.status}</Badge> */}
            </div>
            {/* <div className="mt-2 text-sm/6 text-zinc-500">
              {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
            </div> */}
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Edit</Button>
          {/* <Button>View</Button> */}
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <Stat title="Total number of data" value={'15'} change={'43'} />
        <Stat
          title="Completness"
          value={'24'}
          change={'12'}
        />
      </div>
      <div className="flex items-center justify-between">
        <Subheading className="mt-12">Data</Subheading>
        <div className="flex gap-1">
          <Button plain><PlusCircleIcon /></Button>
          <Button plain><ArrowsPointingOutIcon /></Button>
        </div>
      </div>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  )
}