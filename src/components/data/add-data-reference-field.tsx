import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getAllDataFromActivity, GetAllDataFromActivityResponse } from "@/api/data";
import { ActivityField, ActivityFieldReference } from "@/models/monitoring";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../ui/spinner';
import { Field, Label } from '../ui/fieldset';

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

  return (
    <div>
      <Field>
        <Label>{field.name}</Label>
        {/* { isPending 
          ? <Spinner />
          :  <Listbox
              placeholder={`Select ${field.name}`}
              value={fieldValues}
              onChange={(newValue) => onUpdateField(field.id, newValue)}
            >
              {data.data.map((datum) => (
                <ListboxOption
                  key={`add-data-reference-field-input-${datum.id}`}
                  value={datum.values[details.fieldToUseId]}
                >
                  <ListboxLabel>{datum.values[details.fieldToUseId]}</ListboxLabel>
                  <ListboxDescription>{datum.values[details.fieldId]}</ListboxDescription>
                </ListboxOption>
              ))}
            </Listbox>
        } */}
      </Field>
    </div>
  )
}
