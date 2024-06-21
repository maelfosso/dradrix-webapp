import Spinner from "components/common/Spinner";
import useCurrentUser from "hooks/useCurrentUser";
import { UserType } from "models/auth";
import { createContext, useContext } from "react";

interface CurrentUserContextType {
  currentUser?: UserType | null;
  isPendingCurrentUser: boolean;
  error: Error | null;
  isError: boolean;
  setCurrentUser: (user: UserType) => void;
}
export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  isPendingCurrentUser: false,
  error: null,
  isError: false,
  setCurrentUser: () => {}
});
export const useCurrentUserContext = () => useContext(CurrentUserContext);


interface CurrentUserContextProviderProps {
  children: JSX.Element
}

const CurrentUserContextProvider = ({ children }: CurrentUserContextProviderProps) => {
  const {currentUser, setCurrentUser, isPendingCurrentUser, error, isError} = useCurrentUser();

  if (isPendingCurrentUser) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isPendingCurrentUser, error, isError}}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserContextProvider;
