import * as React from 'react';
import { ArrowsPointingOutIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDataMutation, deleteDataMutation, getAllDataFromActivity, updateDataMutation } from "@/api/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AddData } from "../components/data/add-data";
import { Data } from "@/models/monitoring";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Subheading } from '@/components/ui/heading';
import Spinner from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useActivityContext } from '@/contexts/activity.context';
import { useMainContext } from '@/contexts/main.context';

export const ActivityDataPage = () => {
  const { organizationId} = useMainContext();
  const { activity } = useActivityContext();

  const [headers, setHeaders] = useState<string[]>([]);
  const [fieldIds, setFieldIds] = useState<string[]>([]);
  const [fields, setFields] = useState<Record<string, {name: string; type: string}>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [currentData, setCurrentData] = useState<Data | undefined>(undefined);
  const [allData, setAllData] = useState<Data[]>([])
  const [dataValues, setDataValues] = useState<Record<string, any>[]>([]);
  const {isPending, data } =
    useQuery(getAllDataFromActivity(organizationId, activity.id));

  const { mutateAsync: mutateCreateData } = useMutation(
    createDataMutation(organizationId, activity.id)
  )

  const { mutateAsync: mutateEditData } = useMutation(
    updateDataMutation(organizationId, activity.id)
  )

  const { mutateAsync: mutateDeleteData } = useMutation(
    deleteDataMutation(organizationId, activity.id)
  )

  const [columns, setColumns] = useState<ColumnDef<Record<string, any>>[]>([])
  useEffect(() => {
    if (!data) return;

    setHeaders(Object.values(data.fields).map((f) => f.name));
    setFieldIds(Object.keys(data.fields));
    setFields(data.fields);
    // setAllData(data.data ?? []);

    setColumns(Object.values(data.fields).map((f) => ({
      accessorKey: f.name,
      header: f.name
    })));
    setDataValues(data.data.map((datum) => ({
      ...datum.values
    })))
  }, [data]);

  const handleSubmitData = async (values: Record<string, any>) => {
    try {
      if (currentData) {
        const response = await mutateEditData({
          dataId: currentData.id,
          data: { values }
        });
        setAllData((currentAllData) => {
          return currentAllData.map((datum) => {
            if (datum.id === response.data.id) {
              return response.data;
            }

            return datum;
          })
        });
      } else {
        const response = await mutateCreateData({ values });
        setAllData([...allData, response.data]);
      }

      setIsSubmittingData(false);
      setIsOpen(false);
    } catch (error) {

      throw error;
    } finally {
      setIsSubmittingData(false);
      setIsOpen(false);
    }
  }

  const handleEditData = (dataId: string) => {
    setIsOpen(true);
    setCurrentData(allData.find((datum) => datum.id == dataId))
  }

  const handleDeleteData = async (dataId: string) => {
    try {
      await mutateDeleteData(dataId);
      setAllData(currentAllData => {
        return currentAllData.filter(datum => datum.id !== dataId)
      });
    } catch (error) {

      throw error;
    }
  }

  if (isPending) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Subheading>Data</Subheading>
        <div className="flex gap-1">
          {/* <Button variant='ghost' onClick={() => setIsOpen(true)}><PlusCircleIcon /></Button>
          {isOpen && <AddData
              currentData={currentData}
              open={isOpen}
              onClose={setIsOpen}
              onSubmittingData={(values) => handleSubmitData(values)}
              isSubmittingDataState={{ isSubmittingData, setIsSubmittingData }}
            />}
          <Button variant='ghost'><ArrowsPointingOutIcon /></Button> */}
          <AddData
            currentData={currentData}
            open={isOpen}
            onClose={setIsOpen}
            onSubmittingData={(values) => handleSubmitData(values)}
            isSubmittingDataState={{ isSubmittingData, setIsSubmittingData }}
          />
        </div>
      </div>
      <DataTable columns={columns} data={dataValues} />
    </div>
  )
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[]
}

export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

      {/* <Table className="mt-4">
        {headers.length > 0 && <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={`activity-data-header-${activityId}-${header}`}>{ header }</TableHeader>
            ))}
            <TableHeader>Created by</TableHeader>
            <TableHeader>Created at</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>}
        <TableBody>
          {allData.map((datum) => (
            <TableRow key={`activity-data-${datum.id}`}>
              {fields && fieldIds.map((fieldId) => (
                <DataValue
                  key={`activity-data-value-${datum.id}-field-${fieldId}`}
                  field={fields[fieldId]} value={datum.values[fieldId]}
                />
              ))}
              <TableCell>{ datum.createdBy.name }</TableCell>
              <TableCell>{ new Date(datum.createdAt).toLocaleString() }</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(datum.id)}
                    >
                      Copy data ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditData(datum.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteData(datum.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

const DataValue = ({
  field,
  value
}: {
  field: {
    name: string;
    type: string;
  }
  value: any
}) => {
  switch (field.type) {
    case "upload":
      return (
        <TableCell className="w-max flex -space-x-10 overflow-hidden">
          { Array.from(value).map((v) => (<img className="w-20 h-20 rounded-full" src={v as string} alt="image" />)) }
        </TableCell>
      )

    default:
      break;
  }
  return (
    <TableCell>
      {value}
    </TableCell>
  )
}
