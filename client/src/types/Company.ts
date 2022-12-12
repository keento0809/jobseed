export const company_status: string[] = ["Interested", "Applied", "Interview", "Rejected"]

export type Location = {
    lat:  number ,
    lng:  number
}

export type Company = {
    company_id?: string;
    seeker_id: string,
    name: string;
    link: string;
    location: Location;
    company_size: string;
    jobtype: string;
    salary?: string;
    description: string;
    status?: string;
    interest?: number;
}