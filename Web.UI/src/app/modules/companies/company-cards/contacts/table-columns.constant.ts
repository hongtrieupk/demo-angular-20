import { ContactCardView } from "../../../../core/api-clients/company/models/contact-card-view.model";
import { Column } from "../../../@shared/components/table/column.model";


export const contactColumns: Column<ContactCardView>[] = [
    {
        i18nTitleKey: 'Company.FirstName',
        dataKey: 'firstName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.LastName',
        dataKey: 'lastName',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.Title',
        dataKey: 'title',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.Email',
        dataKey: 'email',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.Tags',
        dataKey: 'tags',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.Phone',
        dataKey: 'phone',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.MobilePhone',
        dataKey: 'mobilePhone',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.LastActivity',
        dataKey: 'lastActivity',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.SMSAlert',
        dataKey: 'smsAlert',
        cellType: 'checkbox',
        bodyCellInputs: (_, row) => ({
            checked: row.smsAlert,
            readonly: true,
        }),
        cellHorizontalAlign: 'center',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.InfoEmail',
        dataKey: 'infoEmail',
        cellType: 'checkbox',
        bodyCellInputs: (_, row) => ({
            checked: row.infoEmail,
            readonly: true,
        }),
        cellHorizontalAlign: 'center',
        isSortable: true,
    },
];
