import { useQuery } from "@tanstack/react-query";
import { getMonitoredActivities } from "api/monitoring";
import CommonSpinner from "components/common/CommonSpinner";
import MonitoredActivities from "components/monitoring/MonitoredActivities";
import NothingMonitored from "components/monitoring/NothingMonitored";

const MonitoringPage = () => {
  const {isPending, data, error } =
    useQuery(getMonitoredActivities());

  if (isPending) {
    return <CommonSpinner />
  }

  if (error) {
    return <div>Monitoring Page Error: {error.message}</div>
  }

  if (!data) {
    return <NothingMonitored />
  }

  return (
    <MonitoredActivities activities={data} />
  )
}

export default MonitoringPage;
