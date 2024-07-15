import { useMutation } from "@tanstack/react-query";
import { createActivityMutation } from "api/activities";
import MainLayout from "components/layout/MainLayout";
import { createContext, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface MainContext {
  handleCreateActivity: () => void;
}
export const MainContext = createContext<MainContext | null>(null)

interface MainProvider {
  children: JSX.Element
}
export const MainProvider = () => {
  const navigate = useNavigate();
  let { organizationId } = useParams();

  const {mutate: createActivityMutate} = useMutation(createActivityMutation(organizationId!, {
    onSuccess(data) {
      navigate(`activities/${data.activity.id}/edit`)
    },
    onError(error: Error) {
      console.error('on create-activity-mutate error', error)
    }
  }))

  const handleCreateActivity = () => {
    console.log('handleCreateActivity');
    createActivityMutate({});
  }

  const value = useMemo(() => ({
    handleCreateActivity
  }), [
    handleCreateActivity
  ])
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