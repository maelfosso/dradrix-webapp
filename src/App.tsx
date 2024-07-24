import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';
import OnboardingPage, { OnboardingProvider } from 'pages/OnboardingPage';
import AuthLayout from 'components/layout/AuthLayout';
import VisitorLayout from 'components/layout/VisitorLayout';
import NotReadyUserLayout from 'components/layout/NotReadyUserLayout';
import LandingPage from 'pages/LandingPage';
import HomePage from 'pages/HomePage';
import EditActivityPage from 'pages/a/EditActivityPage';
import ActivitiesPage from 'pages/a/ActivitiesPage';
import { MainProvider } from 'contexts/MainContext';
import { ActivityContextProvider } from 'contexts/ActivityContext';
import { DataPage } from 'pages/DataPage';
import { ActivityHome } from 'pages/a/ActivityHome';

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

          <Route path="/org/:organizationId" element={<MainProvider />}>
            <Route index element={<HomePage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/:activityId" element={<ActivityContextProvider />}>
              <Route index element={<ActivityHome />} />
              <Route path="edit" element={<EditActivityPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={routes} />
}

export default App
