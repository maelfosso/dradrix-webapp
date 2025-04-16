import * as React from "react";
import './app.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoute from '@/components/private.route';
import VisitorLayout from '@/components/layout/auth.layout';
import HomePage from '@/pages/home.page';
import ActivityFieldsPage from '@/pages/activity-fields.page';
import ActivitiesPage from '@/pages/activities.page';
import { MainProvider } from '@/contexts/main.context';
import { ActivityWrapper } from '@/contexts/activity.context';
import SettingsPage from '@/pages/settings.page';
import OrganizationSettings from '@/components/settings/organization-settings';
import TeamSettings from '@/components/settings/team-settings';
import JoinLayout from '@/components/layout/JoinLayout';
import { useAuthContext } from '@/contexts/auth.context';
import SignOTP from '@/components/auth/sign-otp';
import SignIn from '@/components/auth/sign-in';
import SetUpProfile from '@/components/auth/set-up-profile';
import SetUpOrganization from '@/components/auth/set-up-organization';
import { ActivityDataPage } from "./pages/activity-data.page";
import { ActivitySettingsPage } from "./pages/activity-settings.page";
import InventoryPage from "./pages/inventory.page";
import AddFamilyItemsPage from "./pages/add-family-items.page";

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
            <Route path="activities">
              <Route index element={<ActivitiesPage />} />
              <Route path=":activityId" element={<ActivityWrapper />}>
                <Route index element={<Navigate to={"edit"} />} />
                <Route path="edit" element={<ActivityFieldsPage />} />
                <Route path="data" element={<ActivityDataPage />} />
                <Route path="settings" element={<ActivitySettingsPage />} />
              </Route>
            </Route>
            <Route path="inventory">
              <Route index element={<InventoryPage />} />
              <Route path="add" element={<AddFamilyItemsPage />} />
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
