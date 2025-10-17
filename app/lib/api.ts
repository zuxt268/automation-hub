import {HealthCheckResponse} from "@/app/types/api";
import {cookies} from 'next/headers';

const API_BASE_URL = process.env.API_BASE_URL;

async function getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    // NextAuthのセッショントークンを取得
    return cookieStore.get('next-auth.session-token')?.value ||
        cookieStore.get('__Secure-next-auth.session-token')?.value;
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = await getSessionToken();

    if (!token) {
        throw new Error('No session token found');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });
    return response.json();
}

export async function getHealthCheck(): Promise<HealthCheckResponse> {
    return apiFetch<HealthCheckResponse>('/healthcheck');
}

