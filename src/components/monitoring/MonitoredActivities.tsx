import { MonitoredActivity } from "models/monitoring"
import MonitoredActivityItem from "./MonitoredActivityItem";

interface Props {
  activities: MonitoredActivity[]
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
