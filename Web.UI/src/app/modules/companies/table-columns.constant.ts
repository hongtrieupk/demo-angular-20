import { CompanyOveralInfo } from "../../core/api-clients/company/models/company-overal-info.model";
import { Column } from "../@shared/components/table/column.model";

export const companyColumns: Column<CompanyOveralInfo>[] = [
    {
        i18nTitleKey: 'Company.OrgNumber',
        dataKey: 'orgNumber',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.Name',
        dataKey: 'name',
        isSortable: true,
    },
    {
        i18nTitleKey: 'Company.Web',
        dataKey: 'web',
        isSortable: true,
    },
];
