import { DealActivityTypesEnum } from '../../../enums/deal-activity-types.enum';

export interface ActivityCardView {
  activityId: string;
  dealId: string;
  date: string;
  activityTypeId: DealActivityTypesEnum;
  activityType: string;
  title: string;
  customerPersonName: string;
  assignedName: string;
  status: string;
  note?: string;
}
