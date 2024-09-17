import { useMutation, useQuery } from "@tanstack/react-query";
import { ACTIVITIES, createActivityMutation, getAllActivities, ORGANIZATIONS } from "api/activities";
import { getOrganization } from "api/organization";
import Spinner from "components/common/Spinner";
import MainLayout from "components/layout/MainLayout";
import { Activity } from "models/monitoring";
import { Organization } from "models/onboarding";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

interface MainContext {
  organization: Organization | null,
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
  const { authenticatedUser } = useAuthContext();
  const [organizationId, setOrganizationId] = useState<string>('');
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!authenticatedUser?.preferences.currentOrganizationId) return;
    setOrganizationId(authenticatedUser.preferences.currentOrganizationId);
  }, [authenticatedUser]);

  const { isPending: isOrganizationPending, data: organizationData } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: async () => getOrganization(organizationId),
    enabled: !!organizationId
  })
  const [organization, setOrganization] = useState<Organization | null>(null);
  useEffect(() => {
    if (!organizationData) return;
    setOrganization(organizationData?.organization);
    refetchActivities();
  }, [organizationData])

  const {mutate: createActivityMutate} = useMutation(createActivityMutation(organizationId!, {
    onSuccess(data) {
      navigate(`activities/${data.activity.id}/edit`)
    },
    onError(error: Error) {
    }
  }))

  console.log('organizationId', organizationId);
  const {isPending: isActivitiesPending, data, error, refetch: refetchActivities } = useQuery({
    queryKey: [ORGANIZATIONS, organizationId, ACTIVITIES],
    queryFn: () => getAllActivities(organizationId),
    enabled: !!organizationId
  });

  useEffect(() => {
    if (data?.activities) {
      setActivities(data.activities);
    }
  }, [data?.activities])

  const handleCreateActivity = () => {
    createActivityMutate({});
  }

  const value = useMemo(() => ({
    organization,
    activities,
    setActivities,
    handleCreateActivity
  }), [
    organization,
    activities,
    setActivities,
    handleCreateActivity
  ])

  if (isActivitiesPending || isOrganizationPending) {
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