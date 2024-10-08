import { ArrowsPointingOutIcon, EllipsisVerticalIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDataMutation, deleteDataMutation, getAllDataFromActivity, updateDataMutation } from "api/data";
import { Button } from "components/common/Button";
import { Subheading } from "components/common/Heading";
import Spinner from "components/common/Spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/common/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AddData } from "./AddData";
import { Data } from "models/monitoring";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "components/common/Dropdown";

export const DataFromActivity = () => {
  const { organizationId, activityId } = useParams();
  if (!organizationId && !activityId) return;

  const [headers, setHeaders] = useState<string[]>([]);
  const [fieldIds, setFieldIds] = useState<string[]>([]);
  const [fields, setFields] = useState<Record<string, {name: string; type: string}>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [currentData, setCurrentData] = useState<Data | undefined>(undefined);
  const [allData, setAllData] = useState<Data[]>([])
  const {isPending, data } =
    useQuery(getAllDataFromActivity(organizationId!, activityId!));

  const { mutateAsync: mutateCreateData } = useMutation(
    createDataMutation(organizationId!, activityId!)
  )

  const { mutateAsync: mutateEditData } = useMutation(
    updateDataMutation(organizationId!, activityId!)
  )

  const { mutateAsync: mutateDeleteData } = useMutation(
    deleteDataMutation(organizationId!, activityId!)
  )

  useEffect(() => {
    if (!data) return;

    setHeaders(Object.values(data.fields).map((f) => f.name));
    setFieldIds(Object.keys(data.fields));
    setFields(data.fields);
    setAllData(data.data ?? []);
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
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <Subheading>Data</Subheading>
        <div className="flex gap-1">
          <Button plain onClick={() => setIsOpen(true)}><PlusCircleIcon /></Button>
          {isOpen && <AddData
              currentData={currentData}
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
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    {/* <DropdownItem href={datum.id}>View</DropdownItem> */}
                    <DropdownItem onClick={() => handleEditData(datum.id)}>Edit</DropdownItem>
                    <DropdownItem onClick={() => handleDeleteData(datum.id)}>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

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