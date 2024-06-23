import CurrentUserContextProvider from "contexts/CurrentUserContext";
import AppContent from "./AppContent";

const AppLayout = () => {

  return (
    <CurrentUserContextProvider>
      <AppContent />
    </CurrentUserContextProvider>
  )
}

export default AppLayout;
