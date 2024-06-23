import { QueryClient } from '@tanstack/react-query';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from 'components/AppLayout';
import AuthPage from 'pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';
import OnboardingPage, { OnboardingProvider } from 'pages/OnboardingPage';
import HomePage from 'pages/HomePage';

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        // {
        //   index: true,
        //   element: <LandingPage />
        // },
        {
          path: "sign-in",
          element: <AuthPage />,
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "onboarding",
              element: <OnboardingProvider><OnboardingPage /></OnboardingProvider>
            },
            {
              path: "c/:organizationId",
              element: <HomePage />
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
