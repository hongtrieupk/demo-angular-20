import { WorkOrderCardView } from "../../../core/api-clients/company/work-order-card-view.model";
import { Column } from "../../@shared/components/table/column.model";

export const workOrderColumns: Column<WorkOrderCardView>[] = [
    {
        i18nTitleKey: 'WorkOrder.WorkOrderNumber',
        dataKey: 'workOrderNumber',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Common.Title',
        dataKey: 'title',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Common.Customer',
        dataKey: 'customerName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Common.RegisteredDate',
        dataKey: 'createdDate',
        isSortable: true,
        cellType: 'date',
    },
    {
        i18nTitleKey: 'Common.DueDate',
        dataKey: 'dateString',
        cellType: 'date',
    },
    {
        i18nTitleKey: 'Common.DueTime',
        dataKey: 'dueTimeDisplay',
    },
    {
        i18nTitleKey: 'Start Date',
        dataKey: 'startDate',
        isSortable: true,
        cellType: 'date',
    },
    {
        i18nTitleKey: 'WorkOrder.TaskType',
        dataKey: 'taskTypeName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'WorkOrder.MainType',
        dataKey: 'mainTypeName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Common.Priority',
        dataKey: 'priority',
        isSortable: true,
    },
    {
        i18nTitleKey: 'WorkOrder.Category',
        dataKey: 'category',
        isSortable: true,
    },
    {
        i18nTitleKey: 'WorkOrder.Frequency',
        dataKey: 'recurrenceTypeName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'WorkOrder.EstimatedHours',
        dataKey: 'estimatedHours',
        isSortable: true,
        cellHorizontalAlign: 'right',
    },
    {
        i18nTitleKey: 'WorkOrder.DoneByServiceDesk',
        dataKey: 'isDoneByServiceDesk',
        cellType: 'checkbox',
        bodyCellInputs: (_, row) => ({
            checked: row.isDoneByServiceDesk,
            readonly: true,
        }),
        cellHorizontalAlign: 'center',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Common.Status',
        dataKey: 'fixedStatusString',
        isSortable: true,
    },
    {
        i18nTitleKey: 'WorkOrder.DoneBy',
        dataKey: 'personName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.ContactPerson',
        dataKey: 'contactName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Common.Age',
        dataKey: 'age',
        isSortable: true,
        cellHorizontalAlign: 'right',
    },
    {
        i18nTitleKey: 'WorkOrder.DaysSinceLastUpdate',
        dataKey: 'daysSinceLastUpdate',
        isSortable: true,
        cellHorizontalAlign: 'right',
    },
    {
        i18nTitleKey: 'WorkOrder.ChangedBy',
        dataKey: 'lastUpdatedByName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'WorkOrder.Changed',
        dataKey: 'lastUpdatedDate',
        isSortable: true,
        cellType: 'date',
    },
];
