import { Activity } from "@/models/monitoring"
import MonitoredActivityItem from "./MonitoredActivityItem";

interface Props {
  activities: Activity[]
}

const MonitoredActivities = ({ activities }: Props) => {

  return (
    <>
    {
      activities.map((activity) => <MonitoredActivityItem activity={activity} />)
    }
    </>
  )
}

export default MonitoredActivities;
