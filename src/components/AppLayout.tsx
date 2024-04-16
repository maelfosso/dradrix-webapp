import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrentUserContextProvider from "contexts/CurrentUserContext";
import AppContent from "./AppContent";

const AppLayout = ({ queryClient }: { queryClient: QueryClient }) => {

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentUserContextProvider>
        <AppContent />
      </CurrentUserContextProvider>
    </QueryClientProvider>
  )
}

export default AppLayout;
