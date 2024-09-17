import * as React from "react";
import './App.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoute from '@/components/PrivateRoute';
import VisitorLayout from '@/components/layout/AuthLayout';
import HomePage from '@/pages/HomePage';
import EditActivityPage from '@/pages/a/EditActivityPage';
import ActivitiesPage from '@/pages/a/ActivitiesPage';
import { MainProvider } from '@/contexts/MainContext';
import { ActivityContextProvider } from '@/contexts/ActivityContext';
import { ActivityHome } from '@/pages/a/ActivityHome';
import SettingsPage from '@/pages/SettingsPage';
import OrganizationSettings from '@/components/settings/OrganizationSettings';
import TeamSettings from '@/components/settings/TeamSettings';
import JoinLayout from '@/components/layout/JoinLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import SignOTP from '@/components/auth/SignOTP';
import SignIn from '@/components/auth/sign-in';
import SetUpProfile from '@/components/auth/SetUpProfile';
import SetUpOrganization from '@/components/auth/SetUpOrganization';

function App() {
  const { authenticatedUser } = useAuthContext();

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            authenticatedUser && authenticatedUser.preferences.currentStatus === "registration-complete"
              ? <Navigate to={`/x`} />
              : <Navigate to={'/auth/sign-in'} replace />
          }
        />

        <Route element={<PrivateRoute />}>
          <Route path="/x" element={<MainProvider />}>
            <Route index element={<HomePage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/:activityId" element={<ActivityContextProvider />}>
              <Route index element={<ActivityHome />} />
              <Route path="edit" element={<EditActivityPage />} />
            </Route>
            <Route path='settings' element={<SettingsPage />}>
              <Route index element={<Navigate to="organization" />} />
              <Route path="organization" element={<OrganizationSettings />} />
              <Route path="team" element={<TeamSettings />} />
            </Route>
          </Route>
        </Route>

        <Route path='auth' element={<VisitorLayout />}>
          <Route index element={<Navigate to={"auth/sign-in"} />} />
          <Route path="check-otp" element={<SignOTP />} />
          <Route path="profile" element={<SetUpProfile />} />
          <Route path="org" element={<SetUpOrganization />} />
          <Route path="sign-in" element={<SignIn />}/>
        </Route>

        <Route path='/join/:invitationToken' element={<JoinLayout />}>
          <Route index element={<Navigate to="sign-in" relative="path" />} />
          <Route path="check-otp" element={<SignOTP />} />
          <Route path="profile" element={<SetUpProfile />} />
          <Route path="sign-in" element={<SignIn />}/>
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={routes} />
}

export default App
