import { ActivityCardView } from '../../../../core/api-clients/company/models/activity-card-view.model';
import { ActivityTypesEnum } from '../../../../core/enums/deal-activity-types.enum';
import { Column } from '../../../@shared/components/table/column.model';

const getActivityTypeIconClass = (
  activityTypeId: ActivityTypesEnum,
): string => {
  switch (activityTypeId) {
    case ActivityTypesEnum.Call:
    case ActivityTypesEnum.Lunch:
      return 'pi pi-phone';
    case ActivityTypesEnum.Email:
      return 'pi pi-telegram';
    case ActivityTypesEnum.Upload:
      return 'pi pi-upload';
    case ActivityTypesEnum.Task:
      return 'pi pi-clock';
    case ActivityTypesEnum.Meeting:
    case ActivityTypesEnum.HandoverMeetingDeliveryConsultant:
    case ActivityTypesEnum.HandoverMeetingSalesConsutant:
    case ActivityTypesEnum.OperationalMeeting:
      return 'pi pi-calendar-minus';
    case ActivityTypesEnum.CustomerDevelopment:
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
    isSortable: true
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
