import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';
import OnboardingPage, { OnboardingProvider } from 'pages/OnboardingPage';
import AuthLayout from 'components/layout/AuthLayout';
import VisitorLayout from 'components/layout/VisitorLayout';
import NotReadyUserLayout from 'components/layout/NotReadyUserLayout';
import MainLayout from 'components/layout/MainLayout';
import LandingPage from 'pages/LandingPage';
import HomePage from 'pages/HomePage';

function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<AuthLayout />}
      >
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<AuthPage />}/>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<NotReadyUserLayout />}>
            <Route
              path="/onboarding"
              element={
                <OnboardingProvider>
                  <OnboardingPage></OnboardingPage>
                </OnboardingProvider>
              }
            />
          </Route>

          <Route path="/c/:organizationId" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={routes} />
}

export default App
