import { DealCardView } from "../../../core/api-clients/company/deal-card-view.model";
import { UpSellingCardView } from "../../../core/api-clients/company/upselling-card-view.model";
import { Column } from "../../@shared/components/table/column.model";

export const dealColumns: Column<DealCardView>[] = [
    {
        i18nTitleKey: 'Deal.DealNo',
        dataKey: 'dealNumber',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Title',
        dataKey: 'title',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Responsible',
        dataKey: 'responsiblePersonName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Category',
        dataKey: 'categoryName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.State',
        dataKey: 'stageName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.LeadFrom',
        dataKey: 'leadFromName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Sum',
        dataKey: 'totalPrice',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Status',
        dataKey: 'status',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Date',
        dataKey: 'wonDate',
        cellHorizontalAlign: 'center',
        cellType: 'date',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Deal.Renegotiation',
        dataKey: 'isRenegotiation',
        cellType: 'checkbox',
        bodyCellInputs: (_, row) => ({
            checked: row.isRenegotiation,
            readonly: true,
        }),
        cellHorizontalAlign: 'center',
        isSortable: true,
    },
];

export const upSellingCols: Column<UpSellingCardView>[] = [
    {
        i18nTitleKey: 'Deal.Name',
        dataKey: 'serviceTypeName',
    },
    {
        i18nTitleKey: 'Deal.InUse',
        dataKey: 'inUse',
        cellType: 'checkbox',
        bodyCellInputs: (_, row) => ({
            checked: row.inUse,
            readonly: true,
        }),
        cellHorizontalAlign: 'center',
    },
    {
        i18nTitleKey: 'Deal.CommentWhyNot',
        dataKey: 'comment',
    },
    {
        i18nTitleKey: 'Deal.ActiveDeal',
        dataKey: 'activeDeal',
        cellType: 'checkbox',
        bodyCellInputs: (_, row) => ({
            checked: row.activeDeal,
            readonly: true,
        }),
        cellHorizontalAlign: 'center',
    },
    {
        i18nTitleKey: 'Deal.DealResponsible',
        dataKey: 'dealResponsiblePersonName',
    },
    {
        i18nTitleKey: 'Deal.ExpectedCloseDate',
        dataKey: 'dealExpectedCloseDate',
        cellHorizontalAlign: 'center',
        cellType: 'date',
    },
    {
        i18nTitleKey: 'Deal.MinimumAgreePeriod',
        dataKey: 'minimumAgreePeriodName',
    },
];
