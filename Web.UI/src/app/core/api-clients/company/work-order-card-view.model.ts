export interface WorkOrderCardView {
    workOrderId: string;
    workOrderNumber: string;
    customerName: string;
    title: string;
    createdDate: string;
    dateString: string;
    dueTimeDisplay: string;
    startDate: string;
    taskTypeName: string;
    mainTypeName: string;
    priority: string;
    category: string;
    recurrenceTypeName: string;
    estimatedHours: number;
    isDoneByServiceDesk: boolean;
    fixedStatusString: string;
    personName: string;
    contactName: string;
    age: string;
    daysSinceLastUpdate: string;
    lastUpdatedByName: string;
    lastUpdatedDate: string;
}
