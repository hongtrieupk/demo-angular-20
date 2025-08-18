import { ActivityCardView } from '../../../core/api-clients/company/activity-card-view.model';
import { DealActivityTypesEnum } from '../../../core/enums/deal-activity-types.enum';
import { Column } from '../../@shared/components/table/column.model';

const getActivityTypeIconClass = (
  activityTypeId: DealActivityTypesEnum,
): string => {
  switch (activityTypeId) {
    case DealActivityTypesEnum.Call:
    case DealActivityTypesEnum.Lunch:
      return 'pi pi-phone';
    case DealActivityTypesEnum.Email:
      return 'pi pi-telegram';
    case DealActivityTypesEnum.Upload:
      return 'pi pi-upload';
    case DealActivityTypesEnum.Task:
      return 'pi pi-clock';
    case DealActivityTypesEnum.Meeting:
    case DealActivityTypesEnum.HandoverMeetingDeliveryConsultant:
    case DealActivityTypesEnum.HandoverMeetingSalesConsutant:
    case DealActivityTypesEnum.OperationalMeeting:
      return 'pi pi-calendar-minus';
    case DealActivityTypesEnum.CustomerDevelopment:
      return 'pi pi-cog';
    default:
      return '';
  }
};
export const activitiesColumns: Column<ActivityCardView>[] = [
  {
    i18nTitleKey: 'Company.Date',
    dataKey: 'date',
    cellHorizontalAlign: 'center',
    cellType: 'date',
  },
  {
    i18nTitleKey: 'Company.Type',
    dataKey: 'activityType',
    cellType: 'rawHtml',
    bodyCell: (data, row, rowIndex) => {
      return `<i class="mr-[5px] ${getActivityTypeIconClass(row.activityTypeId)}"></i>
                    ${row.activityType}`;
    },
  },
  {
    i18nTitleKey: 'Company.Title',
    dataKey: 'title',
  },
  {
    i18nTitleKey: 'Company.Contact',
    dataKey: 'customerPersonName',
  },
  {
    i18nTitleKey: 'Company.ResponsiblePerson',
    dataKey: 'assignedName',
  },
  {
    i18nTitleKey: 'Company.Status',
    dataKey: 'status',
  },
];
