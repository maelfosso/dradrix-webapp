import * as React from 'react';
import { useMainContext } from "@/contexts/main.context";
import { useNavigate, useParams } from "react-router-dom";
import { ActivityItem } from '@/components/activities/activity-item';
import { createActivityMutation } from '@/api/activities';
import { useMutation } from '@tanstack/react-query';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { organizationId } = useMainContext();

  const { activities } = useMainContext();

  const {mutate: createActivityMutate} = useMutation(createActivityMutation(organizationId!, {
    onSuccess(data) {
      console.log('data', data);
      navigate(`${data.activity.id}/edit`);
    },
    onError(error: Error) {
    }
  }))

  const handleAddActivity = () => {
    createActivityMutate({});
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Activities</Heading>
        <Button
          className="-my-0.5"
          onClick={() => handleAddActivity()}
        >
          <PlusIcon />
          Add activity
        </Button>
      </div>
      <ul className="mt-10">
        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            organizationId={organizationId!}
            activity={activity}
            index={index}
            afterDeleting={(activityId) => activities.filter((activity) => activity.id !== activityId)}
          />
        ))}
      </ul>
    </>
  )
}

export default ActivitiesPage;
