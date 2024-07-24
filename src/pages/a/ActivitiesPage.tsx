import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { deleteActivityMutation } from "api/activities";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "components/common/Dropdown";
import { Heading } from "components/common/Heading"
import { Link } from "components/common/Link";
import { useMainContext } from "contexts/MainContext";
import { Activity } from "models/monitoring";
import { useParams } from "react-router-dom";

const ActivitiesPage = () => {
  let { organizationId } = useParams();

  const { handleCreateActivity, activities } = useMainContext();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Activities</Heading>
        <Button
          className="-my-0.5"
          color="dark/white"
          onClick={() => handleCreateActivity()}
        >
          Create activity
        </Button>
      </div>
      <ul className="mt-10">
        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            organizationId={organizationId!}
            activity={activity}
            index={index}
            afterDeleting={(activityId) => activities.filter((activity) => activity.id !== activityId)}
          />
        ))}
      </ul>
    </>
  )
}

export default ActivitiesPage;

interface ActivityItem {
  organizationId: string;
  activity: Activity;
  index: number;
  afterDeleting: (activityId: string) => void;
}
const ActivityItem = ({ organizationId, activity, index, afterDeleting }: ActivityItem) => {
  const { mutateAsync: mutateDeleteActivity } = useMutation(
    deleteActivityMutation(organizationId, activity.id)
  )

  const handleDeleteActivity = async () => {
    try {
     const data = await mutateDeleteActivity({});
     if (data.deleted) {
       afterDeleting(activity.id)
     }
    } catch (e) {}
  }

  return (
    <li key={activity.id}>
      <Divider soft={index > 0} />
      <div className="flex items-center justify-between">
        <div key={activity.id} className="flex gap-6 py-6">
          {/* <div className="w-32 shrink-0">
            <Link href={event.url} aria-hidden="true">
              <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt="" />
            </Link>
          </div> */}
          <div className="space-y-1.5">
            <div className="text-base/6 font-semibold">
              <Link to={activity.id}>{activity.name}</Link>
            </div>
            <div className="text-xs/6 text-zinc-500">
              {activity.description}
            </div>
            <div className="text-xs/6 text-zinc-600">
              {activity.fields.length} fields
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Dropdown>
            <DropdownButton plain aria-label="More options">
              <EllipsisVerticalIcon />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              <DropdownItem href={activity.id}>View</DropdownItem>
              <DropdownItem href={`${activity.id}/edit`}>Edit</DropdownItem>
              <DropdownItem onClick={() => handleDeleteActivity()}>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </li>
  )
}