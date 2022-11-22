
export enum Status {
    interested,
    applied,
    interview,
    rejected
}

export type Location = {
    lat: number,
    lng: number
}

export type Company = {
    company_id: string;
    name: string;
    link: string;
    location: Location;
    jobTitle: string;
    salary: string;
    description: string;
    status: Status;
    interest: number;
}