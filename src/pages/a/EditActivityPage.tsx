import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { FieldGroup, Fieldset, Legend } from "components/common/Fieldset";
import { ActivityField as IActivityField } from "models/monitoring";
import { Fragment, useEffect, useState } from "react";
import { AddItem } from "components/edit-activity/AddItem";
import { ActivityField } from "components/edit-activity/ActivityField";
import { EditTextarea } from "components/edit-activity/EditTextarea";
import { EditInput } from "components/edit-activity/EditInput";
import { useActivityContext } from "contexts/ActivityContext";

const reorder = (list: IActivityField[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const EditActivityPage = () => {
  const { activity, setActivity, handleSetUpdate, handleAddUpdate, handleEditDone } = useActivityContext();
  const [droppableId, setDroppableId] = useState('hello');

  useEffect(() => {
    // change the id later here based on some conditions
    // in my case when my data is loaded
    if (activity.fields.length) {
      setDroppableId('activity-fields');
    }
  }, [activity.fields.length]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const fields = reorder(
      activity.fields, // state.quotes,
      source.index,
      destination.index
    );

    handleSetUpdate("fields", fields);
  }

  return (
    <>
      <form className="grow" onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          <FieldGroup className="space-y-0">
            <EditInput
              value={activity.name}
              placeholder="Name your activity here"
              setValue={(newValue) => setActivity({ ...activity, name: newValue })}
              onEnter={() => handleSetUpdate('name', activity.name)}
              className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white"
            />
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
          <Divider className="my-1" />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable key={droppableId} droppableId={droppableId}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-0"
              >
                <AddItem key='add-item-0' place={'bottom'} position={0} onClick={(position, type) => handleAddUpdate(position, type)} />
                { activity.fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <ActivityField
                      key={field.id}
                      position={index}
                      field={field}
                    />
                    <AddItem
                      key={`add-item-${index + 1}`}
                      place={'bottom'}
                      position={index + 1}
                      onClick={(position, type) => handleAddUpdate(position, type)}
                    />
                  </Fragment>
                ))}
                {provided.placeholder}
              </div>
            )}
            </Droppable>
          </DragDropContext>
        </Fieldset>
      </form>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="button" color="dark/white" className="cursor-pointer" onClick={() => handleEditDone()}>Done</Button>
      </div>
    </>
  )
}

export default EditActivityPage;
