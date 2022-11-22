export type Schedule = {
    title: string;
    date: {startDate?: string, startTime?: string};
    timeInclude: boolean;
    endDate: {endDate?: string, endTime?: string};
    backendColor?: string;
    description?: string;
}