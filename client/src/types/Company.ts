
export enum Status {
    Interested,
    Applied,
    Interview,
    Rejected
}

export type Location = {
    lat: number,
    lng: number
}

export type Company = {
    company_id?: string;
    name: string;
    link: string;
    location: Location;
    company_size: string;
    jobtype: string;
    salary: string;
    description: string;
    status?: Status;
    interest: number;
}