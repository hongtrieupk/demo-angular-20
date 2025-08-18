export interface ContactCardView {
    customerPersonId: string;
    customerId: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    tags: string;
    phone: string;
    mobilePhone: string;
    lastActivity: string;
    smsAlert: boolean;
    infoEmail: boolean;
    isAdmin: boolean;
    inactive: boolean;
    bounced: string;
    unsubscribed: string;
    isLocked: boolean;
    isPrimaryContact: boolean;
}
