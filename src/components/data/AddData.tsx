import { Button } from "components/common/Button";
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from "components/common/Drawer";
import { Field, FieldGroup, Label } from "components/common/Fieldset";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import { Text } from "components/common/Text";
import { useActivityContext } from "contexts/ActivityContext";
import { ActivityField, ActivityFieldMultipleChoices } from "models/monitoring";
import { useEffect, useState } from "react";
import { AddDataUploadField } from "./AddDataUploadField";
import { AddDataReferenceField } from "./AddDataReferenceField";

interface AddDataProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onSubmittingData: (values: Record<string, any>) => void;
  isSubmittingDataState: {
    isSubmittingData: boolean;
    setIsSubmittingData: (isSubmittingData: boolean) => void;
  }
}
export const AddData = ({
  open,
  onClose,
  onSubmittingData,
  isSubmittingDataState
}: AddDataProps) => {
  const { activity } = useActivityContext();
  const [values, setValues] = useState<Record<string, any>>({});
  const { isSubmittingData, setIsSubmittingData } = isSubmittingDataState;

  useEffect(() => {
    console.log('values: ', values);
  }, [values]);

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
            <Listbox
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
            </Listbox>
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
