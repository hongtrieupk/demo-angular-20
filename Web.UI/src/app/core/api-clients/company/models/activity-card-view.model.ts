import { ActivityTypesEnum } from '../../../enums/deal-activity-types.enum';

export interface ActivityCardView {
  activityId: string;
  dealId: string;
  date: string;
  activityTypeId: ActivityTypesEnum;
  activityType: string;
  title: string;
  customerPersonName: string;
  assignedName: string;
  status: string;
  note?: string;
}
