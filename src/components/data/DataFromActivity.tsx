import { ArrowsPointingOutIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getAllDataFromActivity } from "api/data";
import { Button } from "components/common/Button";
import { Subheading } from "components/common/Heading";
import Spinner from "components/common/Spinner";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "components/common/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const DataFromActivity = () => {
  const { organizationId, activityId } = useParams();
  const [headers, setHeaders] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([])

  const {isPending, data, error } =
    useQuery(getAllDataFromActivity(organizationId!, activityId!));

  useEffect(() => {
    buildIdsAndHeaders(data?.fields || {});
    // build
  }, [data]);

  const buildIdsAndHeaders = (fields: Record<string, string>) => {
    // const nameOfFields = Object.values(fields);
    setHeaders(Object.values(fields));
    setIds(Object.keys(fields));
  }

  if (isPending) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <Subheading>Data</Subheading>
        <div className="flex gap-1">
          <Button plain><PlusCircleIcon /></Button>
          <Button plain><ArrowsPointingOutIcon /></Button>
        </div>
      </div>
      <Table className="mt-4">
        {headers.length > 0 && <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader>{ header }</TableHeader>
            ))}
            <TableHeader>Created by</TableHeader>
            <TableHeader>Created at</TableHeader>
          </TableRow>
        </TableHead>}
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
    </div>
  )
}