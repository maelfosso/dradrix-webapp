import { MonitoredActivity } from "models/monitoring";

interface Props {
  activity: MonitoredActivity;
}

const MonitoredActivityItem = ({ activity }: Props) => {

  return (
    <>{ activity.name }</>
  )
}

export default MonitoredActivityItem;
