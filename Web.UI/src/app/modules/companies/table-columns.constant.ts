import { CompanyOveralInfo } from "../../core/api-clients/company/models/company-overal-info.model";
import { Column } from "../@shared/components/table/column.model";

export const companyColumns: Column<CompanyOveralInfo>[] = [
    {
        i18nTitleKey: 'CommonInfo.OrgNumber',
        dataKey: 'orgNumber',
        cellType: 'link',
        bodyCellInputs: (_data, row, _rowIndex) => ({
            target: '_blank',
            label: row.orgNumber,
            routerLink: `companies/view/${row.id}/important-info`,
        }),
        isSortable: true,
    },
    {
        i18nTitleKey: 'CommonInfo.Name',
        dataKey: 'name',
        cellType: 'link',
        bodyCellInputs: (_data, row, _rowIndex) => ({
            target: '_blank',
            label: row.name,
            routerLink: `companies/view/${row.id}/important-info`,
        }),
        isSortable: true,
    },
    {
        i18nTitleKey: 'CommonInfo.Web',
        dataKey: 'web',
        cellType: 'link',
        bodyCellInputs: (_data, row, _rowIndex) => ({
            target: '_blank',
            label: row.web,
            routerLink: `https://${row.web}`,
        }),
        isSortable: true,
    },
];
