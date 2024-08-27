import { useQuery } from "@tanstack/react-query";
import { getAllDataFromActivity, GetAllDataFromActivityResponse } from "api/data";
import { Field, Label } from "components/common/Fieldset";
import { Listbox, ListboxDescription, ListboxLabel, ListboxOption } from "components/common/Listbox";
import Spinner from "components/common/Spinner";
import { ActivityField, ActivityFieldReference } from "models/monitoring";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface AddDataReferenceFieldProps {
  field: ActivityField;
  fieldValues: string;
  onUpdateField: (fieldId: string, values: any) => void;
}
export const AddDataReferenceField = ({
  field,
  fieldValues,
  onUpdateField,
}: AddDataReferenceFieldProps) => {
  const { organizationId } = useParams();
  const details = useMemo(() => (field.details as ActivityFieldReference), [field])
  
  const {isPending, data } =
    useQuery(getAllDataFromActivity(
      organizationId!,
      details.activityId)
    );
  if (!data) return;

  console.log('[AddDataReferenceField] props', field, fieldValues);

  const renderListOfValues = (data: GetAllDataFromActivityResponse | undefined) => {
    if (!data) return;

    return (
      <>
        <Listbox
          placeholder={`Select ${field.name}`}
          value={fieldValues}
          onChange={(newValue) => onUpdateField(field.id, newValue)}
        >
          {data.data.map((datum) => (
            <ListboxOption value={datum.id}>
              <ListboxLabel>{datum.values[details.fieldToUseId]}</ListboxLabel>
              <ListboxDescription>{datum.values[details.fieldId]}</ListboxDescription>
            </ListboxOption>
          ))}
        </Listbox>
      </>
    )
  }

  return (
    <div>
      <Field>
        <Label>{field.name}</Label>
        { isPending 
          ? <Spinner />
          : renderListOfValues(data)
        }
      </Field>
    </div>
  )
}
