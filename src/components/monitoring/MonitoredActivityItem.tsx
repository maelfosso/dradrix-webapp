import { Activity } from "models/monitoring";

interface Props {
  activity: Activity;
}

const MonitoredActivityItem = ({ activity }: Props) => {

  return (
    <>{ activity.name }</>
  )
}

export default MonitoredActivityItem;
