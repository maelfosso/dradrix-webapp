import { deleteActivityMutation } from '@/api/activities';
import { Activity } from '@/models/monitoring';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { Separator } from '../ui/separator';
import { Link } from '../ui/link';

interface ActivityItem {
  organizationId: string;
  activity: Activity;
  index: number;
  afterDeleting: (activityId: string) => void;
}
export const ActivityItem = ({ organizationId, activity, index, afterDeleting }: ActivityItem) => {
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
      <Separator soft={index > 0} />
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
          {/* <Dropdown>
            <DropdownButton plain aria-label="More options">
              <EllipsisVerticalIcon />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              <DropdownItem href={activity.id}>View</DropdownItem>
              <DropdownItem href={`${activity.id}/edit`}>Edit</DropdownItem>
              <DropdownItem onClick={() => handleDeleteActivity()}>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </div>
      </div>
    </li>
  )
}
