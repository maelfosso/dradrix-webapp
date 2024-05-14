import { QueryClient } from '@tanstack/react-query';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from 'components/AppLayout';
import LandingPage from 'pages/LandingPage';
import AuthPage from 'pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';

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
          // children: [
          //   {
          //     path: "sign-in",
          //     element: <SignInPage />
          //   },
          //   {
          //     path: "sign-up",
          //     element: <SignUpPage />
          //   },
          //   {
          //     index: true,
          //     element: <Navigate to="sign-in" replace />
          //   }
          // ]
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "",
              children: []
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={routes} />
}
export default App
