import * as React from 'react';
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ActivityField as IActivityField } from "@/models/monitoring";
import { Fragment, useEffect, useState } from "react";
import { AddFieldItem } from "@/components/edit-activity/add-field-item";
import { ActivityField } from "@/components/edit-activity/activity-field";
import { EditTextarea } from "@/components/edit-activity/edit-textarea";
import { useActivityContext } from "@/contexts/activity.context";
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FieldGroup, Fieldset, Legend } from '@/components/ui/fieldset';

const reorder = (list: IActivityField[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ActivityFieldsPage = () => {
  const navigate = useNavigate(); 

  const { activitiesHref, activity, setActivity, handleSetUpdate, handleAddUpdate } = useActivityContext();
  const [droppableId, setDroppableId] = useState('hello');

  useEffect(() => {
    // change the id later here based on some conditions
    // in my case when my data is loaded
    if (activity?.fields.length) {
      setDroppableId('activity-fields');
    }
  }, [activity?.fields.length]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const fields = reorder(
      activity?.fields ?? [], // state.quotes,
      source.index,
      destination.index
    );

    handleSetUpdate("fields", fields);
  }

  const handleEditDone = () => {
    navigate(activitiesHref);
  }

  if (!activity) {
    return <></>;
  }

  return (
    <>
      {/* <div className="max-lg:hidden">
        <Link to={activitiesHref} className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4" />
          Activities
        </Link>
      </div> */}
      <form className="grow" onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          <FieldGroup className="space-y-0">
            {/* <EditInput
              value={activity.name}
              placeholder="Name your activity here"
              setValue={(newValue) => setActivity({ ...activity, name: newValue })}
              onEnter={() => handleSetUpdate('name', activity.name)}
              className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white"
            /> */}
            <EditTextarea
              name="description"
              placeholder="Describe your activity here"
              className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
              value={activity.description}
              setValue={(newValue) => setActivity({ ...activity, description: newValue })}
              onEnter={() => handleSetUpdate('description', activity.description)}
            />
          </FieldGroup>
        </Fieldset>
        <Fieldset className="mt-6">
          <Legend className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Fields</Legend>
          <Separator className="my-1" />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable key={droppableId} droppableId={droppableId}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-0"
              >
                {/* <AddFieldItem key='add-item-0' place={'bottom'} position={0} onClick={(position, type) => handleAddUpdate(position, type)} /> */}
                { activity.fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <AddFieldItem
                      key={`add-item-${index + 1}`}
                      place={'top'}
                      position={index}
                      onClick={(position, type) => handleAddUpdate(position, type)}
                    />
                    <ActivityField
                      key={field.id}
                      position={index}
                      field={field}
                    />
                  </Fragment>
                ))}
                <AddFieldItem
                  key={`add-item-last`}
                  place={'bottom'}
                  position={activity.fields.length}
                  onClick={(position, type) => handleAddUpdate(position, type)}
                />
                {provided.placeholder}
              </div>
            )}
            </Droppable>
          </DragDropContext>
        </Fieldset>
      </form>

      <Separator className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="button" className="cursor-pointer" onClick={() => handleEditDone()}>Done</Button>
      </div>
    </>
  )
}

export default ActivityFieldsPage;
