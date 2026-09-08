// src/lib/types.ts
export interface User {
    id: number;
    name: string; // Changed from 'name' to 'username' for Djoser default
    email: string;
    is_active?: boolean;
    date_joined?: string;

    title: string,
    country: string,
    mobile_no: string,
    port: string,
    whatsapp: string | boolean,
    balance: number,
    orders: number,
    created_at?: string,
    updated_at?: string,
    shipping_links?: {
        id: number,
        link: string,
        created_at: string,
        description: string,
        updated_at: string,
        status: string,
    }[],
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    name: string; // Changed from 'name' to 'username' for Djoser default
    email: string;
    password: string;
    confirm_password: string; // Changed from 'confirm_password' to 're_password' for Djoser default
}

// export interface ActivateUserCredentials {
//     uid: string;
//     token: string;
// }

export interface ResetPasswordConfirmCredentials {
    uid: string | null;
    token: string | null;
    new_password: string;
    re_new_password: string;
}

export interface UpdateUserPayload {
    title: string;
    country: string;
    port: string;
    mobile_no: string;
    whatsapp: string | boolean;
}

export interface DjoserDetailResponse {
    detail: string;
}

export interface DjoserErrorResponse {
    detail?: string;
    email?: string[]; // Added username for Djoser errors
    name?: string[]; // Keep if your custom model uses 'name'
    password?: string[];
    new_password?: string[];
    re_new_password?: string[];
    uid?: string[];
    token?: string[];
    [key: string]: string[] | string | undefined;
}

export interface JWTTokens {
    access: string;
    refresh: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string | null;
}