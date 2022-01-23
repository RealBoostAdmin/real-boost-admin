export interface PostCountryModel {
    name: string;
}

export interface PatchCountryModel {
    name?: string;
}

export interface CountryModel {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}
