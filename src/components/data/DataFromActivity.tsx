import { ArrowsPointingOutIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDataMutation, getAllDataFromActivity } from "api/data";
import { Button } from "components/common/Button";
import { Subheading } from "components/common/Heading";
import Spinner from "components/common/Spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/common/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AddData } from "./AddData";
import { Data } from "models/monitoring";

export const DataFromActivity = () => {
  const { organizationId, activityId } = useParams();
  if (!organizationId && !activityId) return;

  const [headers, setHeaders] = useState<string[]>([]);
  const [fieldIds, setFieldIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [allData, setAllData] = useState<Data[]>([])
  const {isPending, data, error } =
    useQuery(getAllDataFromActivity(organizationId!, activityId!));

  const { mutateAsync: mutateCreateData } = useMutation(
    createDataMutation(organizationId!, activityId!)
  )

  useEffect(() => {
    if (!data) return;

    setHeaders(Object.values(data.fields));
    setFieldIds(Object.keys(data.fields));
    setAllData(data.data ?? []);
  }, [data]);

  const handleSubmitData = async (values: Record<string, any>) => {
    try {
      const response = await mutateCreateData({ values });
      setAllData([...allData, response.data]);

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
              <TableHeader key={`activity-data-header-${activityId}-${header}`}>{ header }</TableHeader>
            ))}
            <TableHeader>Created by</TableHeader>
            <TableHeader>Created at</TableHeader>
          </TableRow>
        </TableHead>}
        <TableBody>
          {allData.map((datum) => (
            <TableRow key={`activity-data-${datum.id}`}>
              {fieldIds.map((fieldId) => (<TableCell key={`activity-data-field-${datum.id}-${fieldId}`}>{datum.values[fieldId]}</TableCell>))}
              <TableCell>{ datum.createdBy }</TableCell>
              <TableCell>{ datum.createdAt }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
