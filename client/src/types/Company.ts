
export enum Status {
    interested,
    applied,
    interview,
    rejected
}

export type Company = {
    company_id: string;
    name: string;
    link: string;
    location?: Object ;
    jobTitle: string;
    salary: string;
    description: string;
    status: Status;
    interest: number;
}