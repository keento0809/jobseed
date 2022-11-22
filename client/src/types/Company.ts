
export enum Status {
    interested,
    applied,
    interview,
    rejected
}

export type marker = {
    lat: number,
    lng: number
}

export type Company = {
    company_id: string;
    name: string;
    link: string;
    location: marker;
    jobTitle: string;
    salary: string;
    description: string;
    status: Status;
    interest: number;
}