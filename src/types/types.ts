export type Store = {
    id: number;
    location: string;
};


export type Supplier = {
    supplierId: number;
    supplierName: string;
    shortCode: string;
    logo: string | null;
    contactPersonName: string | null;
    email: string | null;
    emailCc: string | null;
    phone: string | null;
    fax: string | null;
    website: string | null;
    webPortal: string | null;
    address: string | null;
    city: string | null;
    postcode: string | null;
    state: string | null;
    country: string | null;
    supplierType: string | null;
    postingGroup: string | null;
    creditScore: number | null;
    status: boolean;
    createdBy: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    supplier_details: any[]; // Adjust type as needed
    ftp_data: any[]; // Adjust type as needed
    price_rules: any[]; // Adjust type as needed
    delivery_schedules: any[]; // Adjust type as needed
    categories: any[]; // Adjust type as needed
    agents: any[]; // Adjust type as needed
};