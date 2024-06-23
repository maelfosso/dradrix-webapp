import AuthContextProvider from "contexts/AuthContext";
import AppContent from "./AppContent";

const AppLayout = () => {

  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  )
}

export default AppLayout;
