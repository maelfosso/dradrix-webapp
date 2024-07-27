import { ArrowsPointingOutIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDataMutation, getAllDataFromActivity } from "api/data";
import { Button } from "components/common/Button";
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from "components/common/Drawer";
import { Field, FieldGroup, Label } from "components/common/Fieldset";
import { Subheading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import Spinner from "components/common/Spinner";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "components/common/Table";
import { Text } from "components/common/Text";
import { useActivityContext } from "contexts/ActivityContext";
import { ActivityField, ActivityFieldMultipleChoices } from "models/monitoring";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const DataFromActivity = () => {
  const { organizationId, activityId } = useParams();
  const [headers, setHeaders] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);

  const {isPending, data, error } =
    useQuery(getAllDataFromActivity(organizationId!, activityId!));

  const { mutateAsync: mutateCreateData } = useMutation(
    createDataMutation(organizationId!, activityId!)
  )

  useEffect(() => {
    buildIdsAndHeaders(data?.fields || {});
  }, [data]);

  const buildIdsAndHeaders = (fields: Record<string, string>) => {
    setHeaders(Object.values(fields));
  }

  const handleSubmitData = (values: Record<string, any>) => {
    try {
      mutateCreateData({ values })
      setIsSubmittingData(false);
      setIsOpen(false);
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
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <Subheading>Data</Subheading>
        <div className="flex gap-1">
          <Button plain onClick={() => setIsOpen(true)}><PlusCircleIcon /></Button>
          {isOpen && <AddData
              open={isOpen}
              onClose={setIsOpen}
              onSubmittingData={(values) => handleSubmitData(values)}
              isSubmittingDataState={{ isSubmittingData, setIsSubmittingData }}
            />}
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

interface AddDataProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onSubmittingData: (values: Record<string, any>) => void;
  isSubmittingDataState: {
    isSubmittingData: boolean;
    setIsSubmittingData: (isSubmittingData: boolean) => void;
  }
}
const AddData = ({
  open,
  onClose,
  onSubmittingData,
  isSubmittingDataState
}: AddDataProps) => {
  const { activity } = useActivityContext();
  const [values, setValues] = useState<Record<string, any>>({});
  const { isSubmittingData, setIsSubmittingData } = isSubmittingDataState;

  const renderFieldInput = (field: ActivityField) => {
    switch (field.type) {
      case "text":
        return (
          <Field key={`field-${field.id}`}>
            <Label>{field.name}</Label>
            <Input
              type="text"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})} />
          </Field>
        )

      case "number":
        return (
          <Field>
            <Label>{field.name}</Label>
            <Input
              type="number"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})} />
          </Field>
        )

      case "date":
        return (
          <Field>
            <Label>{field.name}</Label>
            <Input
              type="date"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})}/>
          </Field>
        )

      case "time":
        return (
          <Field>
            <Label>{field.name}</Label>
            <Input
              type="time"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})}/>
          </Field>
        )

      case "upload":
        return (
          <Field>
            <Label>{field.name}</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </Field>
        )

      case "multiple-choices":
        return (
          <Field>
            <Label>{field.name}</Label>
            <Listbox
              placeholder={`Select ${field.name}`}
              multiple={(field.details as ActivityFieldMultipleChoices).multiple}
              value={values[field.id] || ""}
              onChange={(value) => setValues({ ...values, [field.id]: value})}
            >
              {(field.details as ActivityFieldMultipleChoices).choices.map((choice) => (
                <ListboxOption key={`choice-${field.id}`} value={choice}>
                  <ListboxLabel>{choice}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>
        )

      case "key":
        return (
          <Field>
            <Label>{field.name}</Label>
            <Input
              type="text"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})}/>
          </Field>
        )

      default:
        return (<></>)
    }
  }

  const handleSubmit = () => {
    setIsSubmittingData(true);
    try {
      onSubmittingData(values);
      setValues({})
    } catch (error) {
      // console.error('handleSubmit', error);
    }
  }

  return (
    <Drawer wide open={open} onClose={onClose}>
      <DrawerTitle onClose={() => onClose(false)}>
        Add data
        <Text>{ activity?.name }</Text>
      </DrawerTitle>
      <DrawerContent className="overflow-y-auto">
        <form onSubmit={() => {}} className="mx-auto max-w-4xl">
          <FieldGroup>
            {activity?.fields.map((field) => renderFieldInput(field))}
          </FieldGroup>
        </form>
      </DrawerContent>
      <DrawerFooter>
        <Button withSpin={isSubmittingData} color="dark/white" type="submit" onClick={() => handleSubmit()}>Done</Button>
      </DrawerFooter>
    </Drawer>
  )
}