import { useMutation, useQuery } from "@tanstack/react-query";
import { getActivity, updateActivityMutation } from "api/activities";
import Spinner from "components/common/Spinner";
import { Activity as IActivity, DEFAULT_ACTIVITY_VALUE } from "models/monitoring";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface ActivityContextProps {
  activity: IActivity;
  setActivity: (activity: IActivity) => void;
  handleSetUpdate: (field: string, value: any, position?: number) => void;
  handleAddUpdate: (position: number, type: string) => void;
  handleRemoveUpdate: (position: number) => void;
  activitiesHref: string;
}
const ActivityContext = createContext<ActivityContextProps | null>(null)

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useAuth must be used within an ActivityProvider');
  }
  return context;
}


interface ActivityContextProviderProps {
  children: JSX.Element
}
export const ActivityContextProvider = ({ children }: ActivityContextProviderProps) => {
  let { organizationId, activityId } = useParams();

  const activitiesHref = useMemo(() => {
    return `/org/${organizationId}/activities`;
  }, [organizationId])

  const [activity, setActivity] = useState<IActivity>(DEFAULT_ACTIVITY_VALUE);

  const {isPending, data} = useQuery(getActivity(organizationId!, activityId!));
  useEffect(() => {
    if (data?.activity) {
      setActivity(data.activity);
    }
  }, [data?.activity]);

  const {mutateAsync: mutateUpdateActivity} = useMutation(
    updateActivityMutation(
      organizationId!,
      activityId!
    )
  );

  const handleSetUpdate = async (field: string, value: any, position?: number) => {
    try {
      const data = await mutateUpdateActivity({
        op: 'set',
        field: position !== undefined ? `fields.${position}.${field}` : field,
        value: value,
      });

      setActivity(data.activity);
    } catch (error) {}
  }

  const handleAddUpdate = async (position: number, type: string) => {
    try {
      const data = await mutateUpdateActivity({
        op: "add",
        field: "fields",
        value: {
          type
        },
        position
      })

      setActivity(data.activity);
    } catch (error) {}
  }

  const handleRemoveUpdate = async (position: number) => {
    try {
      const data = await mutateUpdateActivity({
        op: "remove",
        field: "fields",
        position
      })

      setActivity(data.activity);
    } catch (error) {}
  }

  const value = useMemo(
    () => ({
      activity,
      setActivity,
      handleSetUpdate,
      handleAddUpdate,
      handleRemoveUpdate,
      activitiesHref
    }), [
      activity,
      setActivity,
      handleSetUpdate,
      handleAddUpdate,
      handleRemoveUpdate,
      activitiesHref
    ]
  );

  if (isPending) {
    return (
      <Spinner />
    )
  }

  return (
    <ActivityContext.Provider value={value}>
      { children }
    </ActivityContext.Provider>
  )
}
