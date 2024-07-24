import { useMutation, useQuery } from "@tanstack/react-query";
import { createActivityMutation, getAllActivities } from "api/activities";
import Spinner from "components/common/Spinner";
import MainLayout from "components/layout/MainLayout";
import { Activity } from "models/monitoring";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface MainContext {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  handleCreateActivity: () => void;
}
export const MainContext = createContext<MainContext | null>(null)

interface MainProvider {
  children: JSX.Element
}
export const MainProvider = () => {
  const navigate = useNavigate();
  let { organizationId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([])

  const {mutate: createActivityMutate} = useMutation(createActivityMutation(organizationId!, {
    onSuccess(data) {
      navigate(`activities/${data.activity.id}/edit`)
    },
    onError(error: Error) {
      console.error('on create-activity-mutate error', error)
    }
  }))

  const {isPending, data, error } =
    useQuery(getAllActivities(organizationId!));

  useEffect(() => {
    if (data?.activities) {
      setActivities(data.activities);
    }
  }, [data?.activities])

  const handleCreateActivity = () => {
    console.log('handleCreateActivity');
    createActivityMutate({});
  }

  const value = useMemo(() => ({
    activities,
    setActivities,
    handleCreateActivity
  }), [
    activities,
    setActivities,
    handleCreateActivity
  ])

  if (isPending) {
    return <Spinner />
  }

  return (
    <MainContext.Provider value={value}>
      <MainLayout />
    </MainContext.Provider>
  )
}

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within an MainProvider');
  }

  return context;
}