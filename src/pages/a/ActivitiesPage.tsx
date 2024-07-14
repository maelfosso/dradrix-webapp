import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteActivity, deleteActivityMutation, getAllActivities } from "api/activities";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "components/common/Dropdown";
import { Heading } from "components/common/Heading"
import { Link } from "components/common/Link";
import Spinner from "components/common/Spinner";
import { Activity } from "models/monitoring";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActivitiesPage = () => {
  let { organizationId } = useParams();

  const {mutateAsync: mutateDeleteActivity} = useMutation({
    mutationFn: (activityId: string) => deleteActivity(organizationId!, activityId)
  });
  const {isPending, data} = useQuery(getAllActivities(organizationId!));
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    if (data?.activities) {
      setActivities(data.activities);
    }
  }, [data?.activities]);

  const handleDeleteActivity = async (activityId: string) => {
   try {
    const data = await mutateDeleteActivity(activityId);
    if (data.deleted) {
      setActivities(activities.filter((activity) => activity.id !== activityId))
    }
   } catch (e) {}
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Activities</Heading>
        <Button className="-my-0.5" color="dark/white">Create activity</Button>
      </div>
      {isPending && (
        <div><Spinner /></div>
      )}
      <ul className="mt-10">
        {activities.map((activity, index) => (
          <>
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
                      <DropdownItem onClick={() => handleDeleteActivity(activity.id)}>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}

export default ActivitiesPage;
