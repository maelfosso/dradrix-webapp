import { QueryClient } from '@tanstack/react-query';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from 'components/AppLayout';
import LandingPage from 'pages/LandingPage';
import AuthPage from 'pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';
import MonitoringPage from 'pages/MonitoringPage';
import OnboardingPage from 'pages/OnboardingPage';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
      mutations: {}
    }
  });

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout queryClient={queryClient}/>,
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          path: "sign-in",
          element: <AuthPage />,
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "onboarding",
              element: <OnboardingPage />
            },
            {
              path: "monitoring",
              element: <MonitoringPage />
              // children: []
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={routes} />
}
export default App
