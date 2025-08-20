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
    },
    {
        i18nTitleKey: 'Company.Title',
        dataKey: 'title',
    },
    {
        i18nTitleKey: 'Company.Email',
        dataKey: 'email',
    },
    {
        i18nTitleKey: 'Company.Tags',
        dataKey: 'tags',
    },
    {
        i18nTitleKey: 'Company.Phone',
        dataKey: 'phone',
    },
    {
        i18nTitleKey: 'Company.MobilePhone',
        dataKey: 'mobilePhone',
    },
    {
        i18nTitleKey: 'Company.LastActivity',
        dataKey: 'lastActivity',
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
    },
];
