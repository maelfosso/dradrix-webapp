import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getActivity, updateActivityMutation } from "@/api/activities";
import { Activity as IActivity } from "@/models/monitoring";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useMainContext } from "./main.context";
import { ActivityPage } from '@/pages/activity.page';
import Spinner from '@/components/ui/spinner';

interface ActivityContextProps {
  activity: IActivity | null;
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
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
}

export const ActivityProvider = ({ children }: { children: JSX.Element }) => {
  let { activityId } = useParams();
  let { organizationId, activities, setActivities } = useMainContext();

  const activitiesHref = useMemo(() => {
    return `/x/activities`;
  }, [organizationId])

  const [activity, setActivity] = useState<IActivity|null>(null);

  const {isPending, data, refetch} = useQuery(getActivity(organizationId!, activityId!));
  useEffect(() => {
    if (data?.activity) {
      setActivity(data.activity);
    }
  }, [data?.activity]);

  useEffect(() => {
    if (activityId) refetch();
  }, [activityId])

  useEffect(() => {
    return () => {
      setActivity(null)
    }
  }, []);

  useEffect(() => {
    if (!activity) return;

    setActivities(activities.map(((a) => {
      if (a.id === activity.id) {
        return activity;
      } else {
        return a;
      }
    })))
  }, [activity]);

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

export const ActivityWrapper = () => {
  return (
    <ActivityProvider>
      <ActivityPage />
    </ActivityProvider>
  )
}