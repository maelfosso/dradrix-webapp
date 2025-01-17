import * as React from 'react';
import { Field, FieldGroup, Label } from "../ui/fieldset";
import { useActivityContext } from "@/contexts/activity.context";
import { ActivityField, ActivityFieldMultipleChoices, Data } from "@/models/monitoring";
import { useState } from "react";
import { AddDataUploadField } from "./add-data-upload-file";
import { AddDataReferenceField } from "./add-data-reference-field";
import { Button } from '../ui/button';
import { Loader2, Plus, PlusCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Input } from '../ui/input';

interface AddDataProps {
  currentData: Data | undefined;
  open: boolean;
  onClose: (value: boolean) => void;
  onSubmittingData: (values: Record<string, any>) => void;
  isSubmittingDataState: {
    isSubmittingData: boolean;
    setIsSubmittingData: (isSubmittingData: boolean) => void;
  }
}
export const AddData = ({
  currentData,
  open,
  onClose,
  onSubmittingData,
  isSubmittingDataState
}: AddDataProps) => {
  const { activity } = useActivityContext();
  const [values, setValues] = useState<Record<string, any>>(
    currentData
     ? currentData.values
     : {}
  );
  const { isSubmittingData, setIsSubmittingData } = isSubmittingDataState;

  const onUpdateField = (fieldId: string, newFieldValues: any) => {
    setValues({ ...values, [fieldId]: newFieldValues});
  }

  const renderFieldInput = (field: ActivityField) => {
    switch (field.type) {
      case "text":
        return (
          <Field key={`add-data-field-${field.id}`}>
            <Label>{field.name}</Label>
            <Input
              type="text"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})} />
          </Field>
        )

      case "number":
        return (
          <Field key={`add-data-field-${field.id}`}>
            <Label>{field.name}</Label>
            <Input
              type="number"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})} />
          </Field>
        )

      case "date":
        return (
          <Field key={`add-data-field-${field.id}`}>
            <Label>{field.name}</Label>
            <Input
              type="date"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})}/>
          </Field>
        )

      case "time":
        return (
          <Field key={`add-data-field-${field.id}`}>
            <Label>{field.name}</Label>
            <Input
              type="time"
              value={values[field.id] || ""}
              onChange={(event) => setValues({...values, [field.id]: event.target.value})}/>
          </Field>
        )

      case "upload":
        return (
          <AddDataUploadField
            key={`add-data-field-${field.id}`}
            field={field}
            fieldValues={values[field.id]}
            onUpdateField={onUpdateField}
            // setValues={setValues}
          />
        )

      case "multiple-choices":
        return (
          <Field key={`add-data-field-${field.id}`}>
            <Label>{field.name}</Label>
            {/* <Listbox
              placeholder={`Select ${field.name}`}
              multiple={(field.details as ActivityFieldMultipleChoices).multiple}
              value={values[field.id] || ""}
              onChange={(value) => setValues({ ...values, [field.id]: value})}
            >
              {(field.details as ActivityFieldMultipleChoices).choices.map((choice, index) => (
                <ListboxOption key={`add-data-choice-${field.id}-${index}`} value={choice}>
                  <ListboxLabel>{choice}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox> */}
          </Field>
        )

      case "key":
        return (
          <AddDataReferenceField
            field={field}
            fieldValues={values[field.id]}
            onUpdateField={onUpdateField}
            key={`add-data-field-${field.id}`}
          />
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
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='sm'>
          <PlusCircle className='h-4 w-4 mr-2' /> Add data
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add data</SheetTitle>
          <SheetDescription>{activity?.name}</SheetDescription>
        </SheetHeader>
        <div>
          <form onSubmit={() => {}} className="mx-auto max-w-4xl">
            <FieldGroup>
              {activity?.fields.map((field) => renderFieldInput(field))}
            </FieldGroup>
          </form>
        </div>
        <SheetFooter>
          <Button
            disabled={isSubmittingData}
            type="submit"
            onClick={() => handleSubmit()}
          >
            { isSubmittingData && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
