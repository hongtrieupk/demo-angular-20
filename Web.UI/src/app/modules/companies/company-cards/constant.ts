export const TABS = [
    {
        routerLink: 'important-info',
        title: 'CompanyTabs.ImportantInfo',
        icon: 'pi pi-info-circle',
    },
    {
        routerLink: 'contacts',
        title: 'CompanyTabs.Contacts',
        icon: 'pi pi-id-card',
    },
    {
        routerLink: 'activities',
        title: 'CompanyTabs.Activities',
        icon: 'pi pi-wave-pulse',
    },
    {
        routerLink: 'sales',
        title: 'CompanyTabs.Sales',
        icon: 'pi pi-wallet',
    },
    {
        routerLink: 'work-orders',
        title: 'CompanyTabs.WorkOrders',
        icon: 'pi pi-sort-alpha-up',
    },
    {
        routerLink: 'marketing',
        title: 'CompanyTabs.Marketing',
        icon: 'pi pi-dollar',
    },
    {
        routerLink: 'hour-and-project',
        title: 'CompanyTabs.HourAndProject',
        icon: 'pi pi-clock',
    },
    {
        routerLink: 'services',
        title: 'CompanyTabs.Services',
        icon: 'pi pi-wrench',
    },
    {
        routerLink: 'equipment',
        title: 'CompanyTabs.Equipment',
        icon: 'pi pi-briefcase',
    },
];

export const getCompanyClassImageSrc = (score: number): string => {
    if (score > 8) {
        return '/img/nps/happy.png';
    }
    if (score > 6) {
        return '/img/nps/sad.png';
    }
    if (score > 0) {
        return '/img/nps/angry.png';
    }
    return '/img/nps/nps.png';
};
