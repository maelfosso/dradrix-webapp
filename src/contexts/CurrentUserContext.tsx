import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQuery } from "api/auth";
import Spinner from "components/common/Spinner";
import useCurrentUser from "hooks/useCurrentUser";
import { UserType } from "models/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CurrentUserContextType {
  currentUser?: UserType | null;
  setCurrentUser: (user: UserType) => void;
  // isPendingCurrentUser: boolean;
  // error: Error | null;
  // isError: boolean;
}
export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  setCurrentUser: () => {}
  // isPendingCurrentUser: false,
  // error: null,
  // isError: false,
});
export const useCurrentUserContext = () => useContext(CurrentUserContext);


interface CurrentUserContextProviderProps {
  children: JSX.Element
}

const CurrentUserContextProvider = ({ children }: CurrentUserContextProviderProps) => {
  const {isPending: isPendingCurrentUser, data} =
    useQuery(getCurrentUserQuery());

  const [currentUser, setCurrentUser] = useState<UserType|null>(null);

  useEffect(() => {
    if (data) {
      setCurrentUser(data)
    }
  }, [data])

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser
    }), [
      currentUser,
      setCurrentUser
    ]
  );

  if (isPendingCurrentUser) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserContextProvider;
