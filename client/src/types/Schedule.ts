export type Schedule = {
    title: string;
    date: string;
    allDay: boolean;
    start?: Date|null;
    end?: string;
    backendColor?: string;
    description: string;
}